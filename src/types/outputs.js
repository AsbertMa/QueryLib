"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Outputs = exports.Transfer = exports.Event = void 0;
var graphql_1 = require("graphql");
exports.Event = new graphql_1.GraphQLObjectType({
    name: 'Event',
    fields: {
        address: {
            type: graphql_1.GraphQLString
        },
        topics: {
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)),
            resolve: function (source) {
                var keys = ['topic0', 'topic1', 'topic2', 'topic3', 'topic4'];
                return keys.map(function (k) { return source[k]; }).filter(function (t) { return !!t; });
            }
        },
        data: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        }
    }
});
exports.Transfer = new graphql_1.GraphQLObjectType({
    name: 'Transfer',
    fields: {
        sender: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        recipient: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        amount: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        }
    }
});
exports.Outputs = new graphql_1.GraphQLObjectType({
    name: 'Outputs',
    fields: {
        contractAddress: {
            type: graphql_1.GraphQLString,
            resolve: function (source) {
                return source.contractCreate && source.contractCreate.address;
            }
        },
        events: {
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.Event))
        },
        transfers: {
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.Transfer))
        }
    }
});
