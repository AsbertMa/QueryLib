import { createYoga, createSchema } from 'graphql-yoga'
import { GLContext } from './context'
import { GraphQLSchema } from 'graphql'

export function createEndpoint(name: string, schema: GraphQLSchema, ctx: GLContext) {
  const graphQLServer = createYoga({
    graphqlEndpoint: '/' + name,
    schema: createSchema<GLContext>({
      typeDefs: schema
    }),
    context: ctx,
    logging: true,
  })

  return graphQLServer
}

export function getBlockNum(id: string): number {
  return parseInt(id.slice(0, 10))
}