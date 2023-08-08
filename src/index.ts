import express from 'express'
import mainSvc from './node'
import appCode from './codeGen'
import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { createEndpoint } from './utils'
import { context } from './context'

// test
// import createEnd from './temp'

const app = express()
// let index: number[] = []

app.use(express.json())

// app.use('/create/:name', (req, res, next) => {
//   const name = req.params.name
//   const mm = createEnd(name)
//   app.use(mm.graphqlEndpoint, mm)
//   res.send('done')
// })

app.post('/create', async (req, resp, next) => {
  const name = req.body.name
  const abi = req.body.abi
  const addr = req.body.address
  await appCode(name, abi, addr)
  const q = require(`./apps/${name}/query.js`)
  const queryObj = new GraphQLObjectType({
    name: 'Query',
    fields: {
      ...q
    }
  })

  const endpoint = createEndpoint(name, new GraphQLSchema({query: queryObj}), context)
  app.use(endpoint.graphqlEndpoint, endpoint)

  resp.send(`success:   http://localhost:8080/${name}`)
})

app.use(mainSvc.graphqlEndpoint, mainSvc)
app.listen(process.env.PORT, () => {
  console.log(`GraphQL API located at http://localhost:${process.env.PORT}`)
})