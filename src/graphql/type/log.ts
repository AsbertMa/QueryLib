import { objectType } from "nexus"

export const TrasnferLog = objectType({
  name: 'TrasnferLog',
  definition(t) {
    t.nonNull.string('sender')
    t.nonNull.string('recipient')
    t.nonNull.string('amount')
    t.nonNull.field('meta', {
      type: 'LogMeta',
      resolve(source) {
        console.log(source)
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
    })
  }
})

export const EventLog = objectType({
  name: 'EventLog',
  definition(t) {
    t.nonNull.string('address', {
      resolve(s) {
        return s.contractAddr
      }
    })
    t.nonNull.list.nonNull.field('topics', {
      type: 'String',
      resolve(source) {
        const keys = ['topic0', 'topic1', 'topic2', 'topic3', 'topic4']
        return keys.map(k => source[k]).filter(t => !!t)
      }
    })
    t.nonNull.string('data')
    t.nonNull.field('meta', {
      type: 'LogMeta',
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
    })
  }
})

export const TransferLogs = objectType({
  name: 'TransferLogs',
  definition(t) {
    t.nonNull.int('count')
    t.nonNull.list.nonNull.field('logs', {
      type: 'TrasnferLog',
      resolve(s) {
        return s.logs
      }
    })
  },
})

export const EventLogs = objectType({
  name: 'EventLogs',
  definition(t) {
    t.nonNull.int('count'),
    t.nonNull.list.nonNull.field('logs', {
      type: 'EventLog',
      resolve(s) {
        return s.logs
      }
    })
  },
})