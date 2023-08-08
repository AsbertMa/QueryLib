"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventLogs = exports.TransferLogs = exports.EventLog = exports.TrasnferLog = void 0;
var graphql_1 = require("graphql");
var meta_1 = require("./meta");
exports.TrasnferLog = new graphql_1.GraphQLObjectType({
    name: 'TrasnferLog',
    fields: {
        sender: { type: graphql_1.GraphQLString },
        recipient: { type: graphql_1.GraphQLString },
        amount: { type: graphql_1.GraphQLString },
        meta: {
            type: meta_1.LogMeta,
            resolve: function (source) {
                return {
                    clauseIndex: source.clause.index,
                    blockID: source.clause.tx.block.id,
                    blockNumber: source.clause.tx.block.number,
                    blockTimestamp: source.clause.tx.block.timestamp,
                    txIndex: source.clause.tx.index,
                    txID: source.clause.tx.id,
                    txOrigin: source.clause.tx.origin
                };
            }
        }
    }
});
exports.EventLog = new graphql_1.GraphQLObjectType({
    name: 'EventLog',
    fields: {
        address: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            resolve: function (s) {
                return s.contractAddr;
            }
        },
        topics: {
            type: new graphql_1.GraphQLList(graphql_1.GraphQLString),
            resolve: function (source) {
                var keys = ['topic0', 'topic1', 'topic2', 'topic3', 'topic4'];
                return keys.map(function (k) { return source[k]; }).filter(function (t) { return !!t; });
            }
        },
        data: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        meta: {
            type: meta_1.LogMeta,
            resolve: function (source) {
                return {
                    clauseIndex: source.clause.index,
                    blockID: source.clause.tx.block.id,
                    blockNumber: source.clause.tx.block.number,
                    blockTimestamp: source.clause.tx.block.timestamp,
                    txID: source.clause.tx.id,
                    txIndex: source.clause.tx.index,
                    txOrigin: source.clause.tx.origin
                };
            }
        }
    }
});
exports.TransferLogs = new graphql_1.GraphQLObjectType({
    name: 'TransferLogs',
    fields: {
        count: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        logs: {
            type: new graphql_1.GraphQLList(exports.TrasnferLog),
            resolve: function (s) {
                return s.logs;
            }
        }
    }
});
exports.EventLogs = new graphql_1.GraphQLObjectType({
    name: 'EventLogs',
    fields: {
        count: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        logs: {
            type: new graphql_1.GraphQLList(exports.EventLog),
            resolve: function (s) {
                return s.logs;
            }
        }
    }
});
