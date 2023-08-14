import nodeSvc from './node'
import app from './main'

app.use(nodeSvc.graphqlEndpoint, nodeSvc)
app.listen(process.env.PORT, () => {
  console.log(`GraphQL API located at http://localhost:${process.env.PORT}`)
})