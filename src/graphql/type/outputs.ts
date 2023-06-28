import { objectType } from "nexus"

export const Outputs = objectType({
  name: 'Outputs',
  definition(t) {
    t.nullable.string('contractAddress', {
      resolve(r: any) {
        return r.contractCreate && r.contractCreate.address
      }
    })
    t.nonNull.list.nonNull.field('events', {
      type: 'Event'
    })
    t.nonNull.list.nonNull.field('transfers', {
      type: 'Transfer'
    })
  },
})

export const Event = objectType({
  name: 'Event',
  definition(t) {
    t.nonNull.string('address', {
      resolve(s: any) {
        return s.contractAddr
      }
    })
    t.nonNull.list.nonNull.field('topics', {
      type: 'String',
      resolve(source: any) {
        const keys = ['topic0', 'topic1', 'topic2', 'topic3', 'topic4']
        return keys.map(k => source[k]).filter(t => !!t)
      }
    })
    t.nonNull.string('data')
  }
})

export const Transfer = objectType({
  name: 'Transfer',
  definition(t) {
    t.nonNull.string('sender')
    t.nonNull.string('recipient')
    t.nonNull.string('amount')
  }
})

