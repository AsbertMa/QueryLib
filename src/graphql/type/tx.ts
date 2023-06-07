import { objectType } from 'nexus'

export const Tx = objectType({
  name: 'Tx',
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
      resolve(tx, _, ctx) {
        const blockID = tx.blockID
        return ctx.prisma.block.findUnique({
          where: {
            id: blockID
          },
          select: {
            id: true,
            number: true,
            timestamp: true
          }
        }).then((b) => {
          return {
            blockID: b.id,
            blockNumber: b.number,
            blockTimestamp: b.timestamp
          }
        })
      }
    })
    // Clauses
    t.nonNull.list.nonNull.field('clauses', {
      type: 'Clause',
      resolve(tx, _, ctx) {
        const id = tx.id
        return ctx.prisma.clause.findMany({
          where: {
            txID: id
          },
          select: {
            to: true,
            data: true,
            value: true
          },
          orderBy: {
            index: 'asc'
          }
        })
      }
    })
    // Receipt
    t.nullable.field('receipt', {
      type: 'Receipt',
      resolve(tx) {
        return tx
      }
    })
  }
})
