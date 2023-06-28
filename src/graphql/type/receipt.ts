import { objectType } from "nexus"

export const Receipt = objectType({
  name: 'Receipt',
  definition(t) {
    t.nonNull.int('gasUsed')
    t.nonNull.string('gasPayer')
    t.nonNull.string('paid')
    t.nonNull.string('reward')
    t.nonNull.boolean('reverted')
    t.nonNull.field('meta', {
      type: 'ReceiptMeta',
      resolve(infos: any, _, ctx) {
        return {
          blockID: infos.blockID,
          blockNumber: infos.block.number,
          blockTimestamp: infos.block.timestamp,
          txID: infos.id,
          txIndex: infos.index,
          txOrigin: infos.origin
        }
      }
    })
    t.nonNull.list.nonNull.field('outputs', {
      type: 'Outputs',
      async resolve(tx: any, _, ctx) {
        return tx.clauses
      }
    })
  },
})