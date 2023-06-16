import { objectType } from 'nexus'

export const Block = objectType({
  name: 'Block',
  definition(t) {
    t.nonNull.int('number')
    t.nonNull.string('id')
    t.nonNull.int('size')
    t.nonNull.string('parentID')
    t.nonNull.int('timestamp')
    t.nonNull.int('gasLimit')
    t.nonNull.string('beneficiary')
    t.nonNull.int('gasUsed')
    t.nonNull.int('totalScore')
    t.nonNull.string('txsRoot')
    t.nonNull.int('txsFeatures')
    t.nonNull.string('stateRoot')
    t.nonNull.string('receiptsRoot')
    t.nonNull.string('signer')
    t.nonNull.boolean('com')
    t.nonNull.boolean('isTrunk')
    t.nonNull.boolean('isFinalized')
    t.nonNull.list.nonNull.field('expendTxs', {
      type: 'Transaction',
      resolve(block) {
        return block.txs
      }
    })
    t.nonNull.list.nonNull.field('transactions', {
      type: 'String',
      resolve(block) {
        return block.txs.map(t => {
          return t.id
        })

      }
    })
  },
})

export const Blocks = objectType({
  name: 'Blocks',
  definition(t) {
    t.nonNull.int('count'),
    t.nonNull.list.field('list', {
      type: 'Block'
    })
  },
})
