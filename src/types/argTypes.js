"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Range = exports.TransferCriteria = exports.EventCriteria = exports.Order = exports.Unit = void 0;
var graphql_1 = require("graphql");
exports.Unit = new graphql_1.GraphQLEnumType({
    name: 'Unit',
    values: {
        BLOCK: { value: 'block' },
        TIME: { value: 'time' }
    }
});
exports.Order = new graphql_1.GraphQLEnumType({
    name: 'Order',
    values: {
        DESC: { value: 'desc' },
        ASC: { value: 'asc' }
    }
});
exports.EventCriteria = new graphql_1.GraphQLInputObjectType({
    name: 'EventCriteria',
    fields: {
        address: {
            type: graphql_1.GraphQLString
        },
        topic0: {
            type: graphql_1.GraphQLString
        },
        topic1: {
            type: graphql_1.GraphQLString
        },
        topic2: {
            type: graphql_1.GraphQLString
        },
        topic3: {
            type: graphql_1.GraphQLString
        },
        topic4: {
            type: graphql_1.GraphQLString
        },
    }
});
exports.TransferCriteria = new graphql_1.GraphQLInputObjectType({
    name: 'TransferCriteria',
    fields: {
        txOrigin: {
            type: graphql_1.GraphQLString
        },
        sender: {
            type: graphql_1.GraphQLString
        },
        recipient: {
            type: graphql_1.GraphQLString
        }
    }
});
exports.Range = new graphql_1.GraphQLInputObjectType({
    name: 'Range',
    fields: {
        unit: {
            type: new graphql_1.GraphQLNonNull(exports.Unit)
        },
        from: {
            type: graphql_1.GraphQLInt
        },
        to: {
            type: graphql_1.GraphQLInt
        },
    }
});
