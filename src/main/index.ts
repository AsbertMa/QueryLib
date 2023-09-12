import express from 'express'
import manageSchema from './manage'
import { createYoga, createSchema } from 'graphql-yoga'
import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { createEndpoint } from '../utils'
import { context } from '../context'
import Path from 'path'
import { readdir } from 'fs';

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

function loadEndpoints() {
  const appsFolder = Path.join(__dirname, '../apps')
  readdir(appsFolder, (err, paths) => {
    paths.forEach((p, index) => {
      if (p !== 'index.ts') {
        const ep = require(`../apps/${p}/query.js`)
        const queryObj = new GraphQLObjectType({
          name: 'Query',
          fields: {
            ...ep
          }
        })
    
        const endpoint = createEndpoint(p, new GraphQLSchema({query: queryObj}), context)
        app.use(endpoint.graphqlEndpoint, endpoint)
      }
    })
  })
}

loadEndpoints()

export default app