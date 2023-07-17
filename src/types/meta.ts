import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'

export const TxMeta = new GraphQLObjectType({
  name: 'TxMeta',
  fields: {
    blockID: { type: new GraphQLNonNull(GraphQLString) },
    blockNumber: { type: new GraphQLNonNull(GraphQLString) },
    blockTimestamp: { type: new GraphQLNonNull(GraphQLString) }
  }
})

export const ReceiptMeta = new GraphQLObjectType({
  name: 'ReceiptMeta',
  fields: {
    blockID: { type: new GraphQLNonNull(GraphQLString) },
    txID: { type: new GraphQLNonNull(GraphQLString) },
    txOrigin: { type: new GraphQLNonNull(GraphQLString) },
    blockNumber: { type: new GraphQLNonNull(GraphQLInt) },
    blockTimestamp: { type: new GraphQLNonNull(GraphQLInt) },
    txIndex: { type: new GraphQLNonNull(GraphQLInt) }
  }
})

export const LogMeta = new GraphQLObjectType({
  name: 'LogMeta',
  fields: {
    blockID: { type: new GraphQLNonNull(GraphQLString) },
    txID: { type: new GraphQLNonNull(GraphQLString) },
    txOrigin: { type: new GraphQLNonNull(GraphQLString) },
    blockNumber: { type: new GraphQLNonNull(GraphQLInt) },
    blockTimestamp: { type: new GraphQLNonNull(GraphQLInt) },
    txIndex: { type: new GraphQLNonNull(GraphQLInt) },
    clauseIndex: { type: new GraphQLNonNull(GraphQLInt) }
  }
})