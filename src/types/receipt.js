"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Receipt = void 0;
var graphql_1 = require("graphql");
var meta_1 = require("./meta");
var outputs_1 = require("./outputs");
exports.Receipt = new graphql_1.GraphQLObjectType({
    name: 'Receipt',
    fields: {
        gasUsed: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt)
        },
        gasPayer: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        paid: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        reward: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
        },
        reverted: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean)
        },
        meta: {
            type: new graphql_1.GraphQLNonNull(meta_1.ReceiptMeta),
            resolve: function (source) {
                return {
                    blockID: source.blockID,
                    blockNumber: source.block.number,
                    blockTimestamp: source.block.timestamp,
                    txID: source.id,
                    txIndex: source.index,
                    txOrigin: source.origin
                };
            }
        },
        outputs: {
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(outputs_1.Outputs)),
            resolve: function (tx) {
                return tx.clauses;
            }
        }
    }
});
