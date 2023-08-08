"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = exports.Authority = void 0;
var graphql_1 = require("graphql");
exports.Authority = new graphql_1.GraphQLObjectType({
    name: 'Authority',
    fields: {
        listed: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean) },
        endorsor: { type: graphql_1.GraphQLString },
        identity: { type: graphql_1.GraphQLString },
        active: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean) },
        signedBlockCount: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
    }
});
exports.Account = new graphql_1.GraphQLObjectType({
    name: 'Account',
    fields: {
        balance: {
            type: graphql_1.GraphQLString
        },
        energy: {
            type: graphql_1.GraphQLString
        },
        code: {
            type: graphql_1.GraphQLString
        },
        master: {
            type: graphql_1.GraphQLString
        },
        sponsor: {
            type: graphql_1.GraphQLString
        },
        deployer: {
            type: graphql_1.GraphQLString
        },
        authority: {
            type: exports.Authority
        }
    }
});
