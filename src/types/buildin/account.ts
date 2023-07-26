import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'

export const Authority = new GraphQLObjectType({
  name: 'Authority',
  fields: {
    listed: { type: new GraphQLNonNull(GraphQLBoolean) },
    endorsor: { type: GraphQLString },
    identity: { type: GraphQLString },
    active: { type: new GraphQLNonNull(GraphQLBoolean) },
    signedBlockCount: { type: new GraphQLNonNull(GraphQLInt) },
  }
})
export const Account = new GraphQLObjectType({
  name: 'Account',
  fields: {
    balance: {
      type: GraphQLString
    },
    energy: {
      type: GraphQLString
    },
    code: {
      type: GraphQLString
    },
    master: {
      type: GraphQLString
    },
    sponsor: {
      type: GraphQLString
    },
    deployer: {
      type: GraphQLString
    },
    authority: {
      type: Authority
    }
  }
})
