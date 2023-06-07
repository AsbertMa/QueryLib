import { nonNull, objectType } from 'nexus'

export const TxMeta = objectType({
  name: 'TxMeta',
  definition(t) {
    t.nonNull.string('blockID')
    t.nonNull.int('blockNumber')
    t.nonNull.int('blockTimestamp')
  }
})

export const ReceiptMeta = objectType({
  name: 'ReceiptMeta',
  definition(t) {
    t.nonNull.string('blockID')
    t.nonNull.int('blockNumber')
    t.nonNull.int('blockTimestamp')
    t.nonNull.string('txID')
    t.nonNull.id('txIndex')
    t.nonNull.string('txOrigin')
  },
})

export const LogMeta = objectType({
  name: 'LogMeta',
  definition(t) {
    t.nonNull.string('blockID')
    t.nonNull.int('blockNumber')
    t.nonNull.int('blockTimestamp')
    t.nonNull.string('txID')
    t.nonNull.id('txIndex')
    t.nonNull.string('txOrigin')
    t.nonNull.int('clauseIndex')
  },
})