import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql'
import { Order, Range, Transaction, TransactionList } from '../../types'
import { Prisma } from '@prisma/client'

export const transaction: GraphQLFieldConfig<any, any, any> = {
  type: Transaction,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (s, { id }, { prisma }) => {
    return prisma.tx.findUnique({
      where: {
        id: id
      },
      include: {
        block: true,
        clauses: {
          orderBy: {
            index: Prisma.SortOrder.asc
          }
        }
      }
    })
  }
}

export const transactions: GraphQLFieldConfig<any, any, any> = {
  type: TransactionList,
  args: {
    origin: {
      type: GraphQLString
    },
    range: {
      type: Range
    },
    order: {
      type: Order,
      defaultValue: Order.getValue('DESC').value
    },
    skip: {
      type: GraphQLInt
    },
    take: {
      type: GraphQLInt,
      defaultValue: 10
    }
  },
  async resolve(s, { origin, order, take, skip, range }, { prisma }) {
    const rangeFilter = range ? {
      block: {
        [range.unit === 'block' ? 'number' : 'timestamp']: {
          gte: range.from,
          lte: range.to
        }
      }
    } : undefined
    const [count, list] = await prisma.$transaction([
      prisma.tx.count({
        where: {
          origin,
          block: {
            isTrunk: true
          },
          AND: rangeFilter
        }
      }),
      prisma.tx.findMany({
        where: {
          origin,
          block: {
            isTrunk: true
          },
          AND: rangeFilter
        },
        include: {
          block: true,
          clauses: {
            orderBy: {
              index: Prisma.SortOrder.asc
            }
          }
        },
        orderBy: {
          createdAt: order!
        },
        take: take || undefined,
        skip: skip || undefined
      })
    ], {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable
    })

    return {
      count,
      list
    }
  }
}