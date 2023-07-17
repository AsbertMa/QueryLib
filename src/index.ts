import express from 'express'
import mainSvc from './main'

const app = express()
app.use(mainSvc.graphqlEndpoint, mainSvc)

app.listen(process.env.PORT, () => {
  console.log(`GraphQL API located at http://localhost:${process.env.PORT}`)
})