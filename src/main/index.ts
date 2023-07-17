import { GraphQLSchema } from "graphql"
import q from './graphql'
import { context } from "../context"
import { createEndpoint } from "../utils"

const schema = new GraphQLSchema({
  query: q
})

const mainSvc = createEndpoint('main', schema, context)

export default mainSvc