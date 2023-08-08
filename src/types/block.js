"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blocks = exports.Block = void 0;
var graphql_1 = require("graphql");
var transactions_1 = require("./transactions");
exports.Block = new graphql_1.GraphQLObjectType({
    name: 'Block',
    fields: {
        id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        },
        number: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        size: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        parentID: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        timestamp: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        gasLimit: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        beneficiary: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        gasUsed: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        totalScore: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        txsRoot: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        txsFeatures: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        stateRoot: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        receiptsRoot: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        signer: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        com: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean)
        },
        isTrunk: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean)
        },
        isFinalized: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean)
        },
        expendedTxs: {
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(transactions_1.Transaction)),
            resolve: function (soure) {
                return soure.txs;
            }
        },
        transactions: {
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)),
            resolve: function (soure) {
                return soure.txs.map(function (t) {
                    return t.id;
                });
            }
        }
    }
});
exports.Blocks = new graphql_1.GraphQLObjectType({
    name: 'Blocks',
    fields: {
        count: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        list: {
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.Block))
        }
    }
});
