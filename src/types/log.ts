import { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt } from 'graphql'
import { LogMeta } from './meta'
export const TrasnferLog = new GraphQLObjectType({
  name: 'TrasnferLog',
  fields: {
    sender: { type: GraphQLString },
    recipient: { type: GraphQLString },
    amount: { type: GraphQLString },
    meta: {
      type: LogMeta,
      resolve(source) {
        return {
          clauseIndex: source.clause.index,
          blockID: source.clause.tx.block.id,
          blockNumber: source.clause.tx.block.number,
          blockTimestamp: source.clause.tx.block.timestamp,
          txIndex: source.clause.tx.index,
          txID: source.clause.tx.id,
          txOrigin: source.clause.tx.origin
        }
      }
    }
  }
})

export const EventLog = new GraphQLObjectType({
  name: 'EventLog',
  fields: {
    address: {
      type: new GraphQLNonNull(GraphQLString),
      resolve(s) {
        return s.contractAddr
      }
    },
    topics: {
      type: new GraphQLList(GraphQLString),
      resolve(source: any) {
        const keys = ['topic0', 'topic1', 'topic2', 'topic3', 'topic4']
        return keys.map(k => source[k]).filter(t => !!t)
      }
    },
    data: {
      type: new GraphQLNonNull(GraphQLString)
    },
    meta: {
      type: LogMeta,
      resolve(source) {
        return {
          clauseIndex: source.clause.index,
          blockID: source.clause.tx.block.id,
          blockNumber: source.clause.tx.block.number,
          blockTimestamp: source.clause.tx.block.timestamp,
          txID: source.clause.tx.id,
          txIndex: source.clause.tx.index,
          txOrigin: source.clause.tx.origin
        }
      }
    }
  }
})

export const TransferLogs = new GraphQLObjectType({
  name: 'TransferLogs',
  fields: {
    count: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    logs: {
      type: new GraphQLList(TrasnferLog),
      resolve(s: any) {
        return s.logs
      }
    }
  }
})

export const EventLogs = new GraphQLObjectType({
  name: 'EventLogs',
  fields: {
    count: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    logs: {
      type: new GraphQLList(EventLog),
      resolve(s: any) {
        return s.logs
      }
    }
  }
})