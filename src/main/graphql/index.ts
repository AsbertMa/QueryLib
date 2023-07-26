import { GraphQLObjectType } from 'graphql'
import * as block from './block'
import * as event from './event'
import * as receipt from './receipt'
import * as tx from './transaction'
import * as transfers from './transfer'
import * as account from './buildin/account'

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...block,
    ...event,
    ...receipt,
    ...tx,
    ...transfers,
    ...account
  }
})