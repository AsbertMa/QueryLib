import { objectType } from 'nexus'

export const Tx = objectType({
  name: 'Transaction',
  definition(t) {
    t.nonNull.int('chainTag')
    t.nonNull.string('id')
    t.nonNull.string('blockID')
    t.nonNull.string('blockRef')
    t.nonNull.int('expiration')
    t.nonNull.int('gasPriceCoef')
    t.nonNull.int('gas')
    t.nonNull.string('origin')
    t.nullable.string('delegator')
    t.nullable.string('dependsOn')
    t.nonNull.string('nonce')
    t.nonNull.int('size')
    // Meta
    t.nonNull.field('meta', {
      type: 'TxMeta',
      resolve(tx: any, _, ctx) {
        const block = tx.block
        return {
            blockID: block.id,
            blockNumber: block.number,
            blockTimestamp: block.timestamp
        }
      }
    })
    // Clauses
    t.nonNull.list.nonNull.field('clauses', {
      type: 'Clause',
      resolve(tx: any) {
        return tx.clauses
      }
    })
    // Receipt
    t.nullable.field('receipt', {
      type: 'Receipt',
      resolve(tx: any) {
        return tx
      }
    })
  }
})

export const TxList = objectType({
  name: 'Transactions',
  definition(t) {
    t.nonNull.int('count'),
    t.nonNull.list.field('list', {
      type: 'Transaction'
    })
  },
})
