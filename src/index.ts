import { ApolloServer } from "apollo-server"
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { schema } from "./schema"
import { getContext } from "./context"

const port = process.env.PORT || 3000

getContext().then(context => {
  const server = new ApolloServer({
    schema,
    context,
    plugins: [ApolloServerPluginLandingPageLocalDefault()]
  })
  server.listen({ port }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
})