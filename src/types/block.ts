
import { GraphQLString, GraphQLObjectType, GraphQLInt, GraphQLNonNull, GraphQLBoolean, GraphQLList } from 'graphql'
import { Transaction } from './transactions'
export const Block = new GraphQLObjectType({
  name: 'Block',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    number: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    size: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    parentID: {
      type: new GraphQLNonNull(GraphQLString)
    },
    timestamp: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    gasLimit: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    beneficiary: {
      type: new GraphQLNonNull(GraphQLString)
    },
    gasUsed: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    totalScore: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    txsRoot: {
      type: new GraphQLNonNull(GraphQLString)
    },
    txsFeatures: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    stateRoot: {
      type: new GraphQLNonNull(GraphQLString)
    },
    receiptsRoot: {
      type: new GraphQLNonNull(GraphQLString)
    },
    signer: {
      type: new GraphQLNonNull(GraphQLString)
    },
    com: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    isTrunk: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    isFinalized: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    expendedTxs: {
      type: new GraphQLNonNull(new GraphQLList(Transaction)),
      resolve (soure) {
        return soure.txs
      }
    },
    transactions: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      resolve (soure) {
        return soure.txs.map((t: any) => {
          return t.id
        })
      }
    }
  }
})

export const Blocks = new GraphQLObjectType({
  name: 'Blocks',
  fields: {
    count: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    list: {
      type: new GraphQLNonNull(new GraphQLList(Block))
    }
  }
})