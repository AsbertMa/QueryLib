import express from 'express'
import mainSvc from './main'

const app = express()
app.use(mainSvc.graphqlEndpoint, mainSvc)

app.listen(4000, () => {
  console.log(`GraphQL API located at http://localhost:4000`)
})