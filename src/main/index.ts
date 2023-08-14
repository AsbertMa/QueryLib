import express from 'express'
import manageSchema from './manage'
import { createYoga, createSchema } from 'graphql-yoga'

const app = express()

const main = createYoga({
  graphqlEndpoint: '/manage',
  schema: createSchema<{app: typeof app}>({
    typeDefs: manageSchema
  }),
  context: {app},
  logging: true
})

app.use(main.graphqlEndpoint, main)

export default app