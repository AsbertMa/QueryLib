import Path from 'path'
import { readdir, stat } from 'fs'
import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { createEndpoint } from '../utils'
import { context } from '../context'
import { Express } from 'express'


export default function loadEndpoints(app: Express) {
  const appsFolder = __dirname
  readdir(appsFolder, (err, paths) => {
    paths.forEach((p, index) => {
      stat(`${appsFolder}/${p}`, (err, stats) => {
        if (stats.isDirectory()) {
          const ep = require(`./${p}/index.js`)
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
  })
}