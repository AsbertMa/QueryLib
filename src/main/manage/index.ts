import { GraphQLObjectType, GraphQLString, GraphQLFieldConfig, GraphQLSchema } from 'graphql'
import { createEndpoint } from '../../utils'
import appCode from '../../codeGen'
import { context } from '../../context'

const crateApp: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLString,
  args: {
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    abi: { type: GraphQLString }
  },
  async resolve(s, { name, address, abi }, { app, request }) {
    await appCode(name, JSON.parse(abi), address)
    const q = require(`../../apps/${name}/query.js`)
    const queryObj = new GraphQLObjectType({
      name: 'Query',
      fields: {
        ...q
      }
    })

    const endpoint = createEndpoint(name, new GraphQLSchema({query: queryObj}), context)
    app.use(endpoint.graphqlEndpoint, endpoint)
    return `Create successed, explore the endpoint at ${request.headers.origin}/${name}`
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
    crateApp
  }
})

const h = new GraphQLObjectType({
  name: 'hello',
  fields: {
    hello
  }
})

export default new GraphQLSchema({ mutation: add, query: h })
