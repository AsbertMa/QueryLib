import { GraphQLInputObjectType, GraphQLEnumType, GraphQLNonNull, GraphQLString } from 'graphql'

export const Unit = new GraphQLEnumType({
  name: 'Unit',
  values: {
    BLOCK: { value: 'block' },
    TIME: { value: 'time' }
  }
})

export const Order = new GraphQLEnumType({
  name: 'Order',
  values: {
    DESC: { value: 'desc' },
    ASC: { value: 'asc' }
  }
})

export const EventCriteria = new GraphQLInputObjectType({
  name: 'EventCriteria',
  fields: {
    address: {
      type: GraphQLString
    },
    topic0: {
      type: GraphQLString
    },
    topic1: {
      type: GraphQLString
    },
    topic2: {
      type: GraphQLString
    },
    topic3: {
      type: GraphQLString
    },
    topic4: {
      type: GraphQLString
    },
  }
})

export const TransferCriteria = new GraphQLInputObjectType({
  name: 'TransferCriteria',
  fields: {
    txOrigin: {
      type: GraphQLString
    },
    sender: {
      type: GraphQLString
    },
    recipient: {
      type: GraphQLString
    }
  }
})

export const Range = new GraphQLInputObjectType({
  name: 'Range',
  fields: {
    unit:{
      type: new GraphQLNonNull(Unit)
    }
  }
})

