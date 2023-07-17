import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import { TxMeta } from './meta'
import { Receipt } from './receipt'

export const Clause = new GraphQLObjectType({
  name: 'Clause',
  fields: {
    to: { type: GraphQLString },
    value: { type: GraphQLString },
    data: { type: GraphQLString }
  }
})

export const Transaction = new GraphQLObjectType({
  name: 'Transaction',
  fields: {
    chainTag: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    blockID: {
      type: new GraphQLNonNull(GraphQLString)
    },
    blockRef: {
      type: new GraphQLNonNull(GraphQLString)
    },
    expiration: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    gasPriceCoef: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    gas: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    size: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    origin: {
      type: new GraphQLNonNull(GraphQLString)
    },
    delegator: {
      type: new GraphQLNonNull(GraphQLString)
    },
    dependsOn: {
      type: new GraphQLNonNull(GraphQLString)
    },
    nonce: {
      type: new GraphQLNonNull(GraphQLString)
    },
    meta: {
      type: new GraphQLNonNull(TxMeta),
      resolve: (tx) => {
        const b = tx.block
        return {
            blockID: b.id,
            blockNumber: b.number,
            blockTimestamp: b.timestamp
        }
      }
    },
    clauses: {
      type: new GraphQLNonNull(new GraphQLList(Clause)),
      resolve: (source) => {
        return source.clauses
      }
    },
    receipt: {
      type: Receipt,
      resolve: (source) => {
        return source
      }
    }
  }
})

export const TransactionList = new GraphQLObjectType({
  name: 'Transactions',
  fields: {
    count: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    list: {
      type: new GraphQLNonNull(new GraphQLList(Transaction))
    }
  }
})