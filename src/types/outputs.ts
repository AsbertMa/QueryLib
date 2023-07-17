import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'

export const Event = new GraphQLObjectType({
  name: 'Event',
  fields: {
    address: {
      type: GraphQLString
    },
    topics: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      resolve: (source) => {
        const keys = ['topic0', 'topic1', 'topic2', 'topic3', 'topic4']
        return keys.map(k => source[k]).filter(t => !!t)
      }
    },
    data: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
})

export const Transfer = new GraphQLObjectType({
  name: 'Transfer',
  fields: {
    sender: {
      type: new GraphQLNonNull(GraphQLString)
    },
    recipient: {
      type: new GraphQLNonNull(GraphQLString)
    },
    amount: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
})
export const Outputs = new GraphQLObjectType({
  name: 'Outputs',
  fields: {
    contractAddress: {
      type: GraphQLString,
      resolve(source: any) {
        return source.contractCreate && source.contractCreate.address
      }
    },
    events: {
      type: new GraphQLNonNull(new GraphQLList(Event))
    },
    transfers: {
      type: new GraphQLNonNull(new GraphQLList(Transfer))
    }
  }
})