import exporess from 'express'
import path from 'path'
import nodeSvc from './node'
import app from './main'
import loadEndpoints from './apps'

app.use(nodeSvc.graphqlEndpoint, nodeSvc)
app.use('/', exporess.static(path.join(__dirname, '../public'), {
  index: 'index.html',
  extensions: ['html'],
  redirect: false
}))

loadEndpoints(app)
app.listen(process.env.PORT, () => {
  console.log(`GraphQL API located at http://localhost:${process.env.PORT}`)
})