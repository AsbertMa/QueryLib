"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogMeta = exports.ReceiptMeta = exports.TxMeta = void 0;
var graphql_1 = require("graphql");
exports.TxMeta = new graphql_1.GraphQLObjectType({
    name: 'TxMeta',
    fields: {
        blockID: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        blockNumber: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        blockTimestamp: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
    }
});
exports.ReceiptMeta = new graphql_1.GraphQLObjectType({
    name: 'ReceiptMeta',
    fields: {
        blockID: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        txID: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        txOrigin: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        blockNumber: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        blockTimestamp: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        txIndex: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) }
    }
});
exports.LogMeta = new graphql_1.GraphQLObjectType({
    name: 'LogMeta',
    fields: {
        blockID: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        txID: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        txOrigin: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        blockNumber: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        blockTimestamp: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        txIndex: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        clauseIndex: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) }
    }
});
