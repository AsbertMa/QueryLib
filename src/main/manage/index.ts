import { GraphQLObjectType, GraphQLString, GraphQLFieldConfig, GraphQLSchema, GraphQLList } from 'graphql'
import { createEndpoint } from '../../utils'
import appCode from '../../codeGen'
import { context } from '../../context'
import { Contract } from '../../types'

const crateProject: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLString,
  args: {
    name: {
      type: GraphQLString
    },
    abis: {
      type: new GraphQLList(Contract)
    }
  },
  async resolve(s, { name, abis }, { app, request }) {
    console.log(name, abis)
    await appCode(name, abis)
    const q = require(`../../apps/${name}/index.js`)
    const queryObj = new GraphQLObjectType({
      name: 'Query',
      fields: {
        ...q
      }
    })

    const endpoint = createEndpoint(name, new GraphQLSchema({query: queryObj}), context)
    app.use(endpoint.graphqlEndpoint, endpoint)
    return `Create successed, explore the endpoint at ${request.headers.get('origin')}/${name}`
  }
}

const hello: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLString,
  resolve() {
    return 'hello !'
  }
}

const add = new GraphQLObjectType({
  name: 'manage',
  fields: {
    crateProject
  }
})

const h = new GraphQLObjectType({
  name: 'hello',
  fields: {
    hello
  }
})

export default new GraphQLSchema({ mutation: add, query: h })
