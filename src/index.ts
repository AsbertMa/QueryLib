import express from 'express'
import mainSvc from './main'
import createEnd from './temp'

const app = express()
let index: number[] = []

app.use(mainSvc.graphqlEndpoint, mainSvc)

app.use('/create/:name', (req, res, next) => {
  const name = req.params.name
  const mm = createEnd(name)
  app.use(mm.graphqlEndpoint, mm)
  res.send('done')
})

app.listen(process.env.PORT, () => {
  console.log(`GraphQL API located at http://localhost:${process.env.PORT}`)
})