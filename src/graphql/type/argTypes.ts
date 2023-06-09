import { inputObjectType, enumType } from 'nexus'

export const EventCriteria = inputObjectType({
  name: 'EventCriteria',
  definition(t) {
    t.nullable.string('address')
    t.nullable.string('topic0')
    t.nullable.string('topic1')
    t.nullable.string('topic2')
    t.nullable.string('topic3')
    t.nullable.string('topic4')
  },
})

export const TransferCriteria = inputObjectType({
  name: 'TransferCriteria',
  definition(t) {
    t.nullable.string('txOrigin')
    t.nullable.string('sender')
    t.nullable.string('recipient')
  },
})

export const Order = enumType({
  name: 'Order',
  members: ['desc', 'asc']
})