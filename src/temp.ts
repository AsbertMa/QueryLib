import { GraphQLObjectType, GraphQLFieldConfig, GraphQLString, GraphQLSchema } from 'graphql'
import {createEndpoint} from './utils'

function createQuery(name: string): GraphQLFieldConfig<any, any, any> {
  return {
    type: GraphQLString,
    resolve: () => {
      return name
    }
  }
}

export default function createEnd(name: string) {
  const f = createQuery(name)
  const s =  new GraphQLObjectType ({
    name: name,
    fields: {
      f
    }
  })

  return createEndpoint(name, new GraphQLSchema({
    query: s
  }))
}

 