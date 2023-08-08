"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionList = exports.Transaction = exports.Clause = void 0;
var graphql_1 = require("graphql");
var meta_1 = require("./meta");
var receipt_1 = require("./receipt");
exports.Clause = new graphql_1.GraphQLObjectType({
    name: 'Clause',
    fields: {
        to: { type: graphql_1.GraphQLString },
        value: { type: graphql_1.GraphQLString },
        data: { type: graphql_1.GraphQLString }
    }
});
exports.Transaction = new graphql_1.GraphQLObjectType({
    name: 'Transaction',
    fields: {
        chainTag: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        blockID: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        blockRef: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        expiration: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        gasPriceCoef: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        gas: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        size: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        origin: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        delegator: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        dependsOn: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        nonce: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        meta: {
            type: new graphql_1.GraphQLNonNull(meta_1.TxMeta),
            resolve: function (tx) {
                var b = tx.block;
                return {
                    blockID: b.id,
                    blockNumber: b.number,
                    blockTimestamp: b.timestamp
                };
            }
        },
        clauses: {
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.Clause)),
            resolve: function (source) {
                return source.clauses;
            }
        },
        receipt: {
            type: receipt_1.Receipt,
            resolve: function (source) {
                return source;
            }
        }
    }
});
exports.TransactionList = new graphql_1.GraphQLObjectType({
    name: 'Transactions',
    fields: {
        count: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        list: {
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.Transaction))
        }
    }
});
