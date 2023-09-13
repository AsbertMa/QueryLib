import express from 'express'
import manageSchema from './manage'
import { createYoga, createSchema } from 'graphql-yoga'
import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { createEndpoint } from '../utils'
import { context } from '../context'
import Path from 'path'
import { readdir, stat } from 'fs';

const app = express()

const main = createYoga({
  graphqlEndpoint: '/manage',
  schema: createSchema<{ app: typeof app }>({
    typeDefs: manageSchema
  }),
  context: { app },
  logging: true
})

app.use(main.graphqlEndpoint, main)

export default app