import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'
import { ReceiptMeta } from './meta'
import { Outputs } from './outputs'

export const Receipt = new GraphQLObjectType({
  name: 'Receipt',
  fields: {
    gasUsed: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    gasPayer: {
      type: new GraphQLNonNull(GraphQLString)
    },
    paid: {
      type: new GraphQLNonNull(GraphQLString)
    },
    reward: {
      type: new GraphQLNonNull(GraphQLString)
    },
    reverted: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    meta: {
      type: new GraphQLNonNull(ReceiptMeta),
      resolve: (source) => {
        return {
          blockID: source.blockID,
          blockNumber: source.block.number,
          blockTimestamp: source.block.timestamp,
          txID: source.id,
          txIndex: source.index,
          txOrigin: source.origin
        }
      }
    },
    outputs: {
      type: new GraphQLNonNull(new GraphQLList(Outputs)),
      resolve(tx) {
        return tx.clauses
      }
    }
  }
})