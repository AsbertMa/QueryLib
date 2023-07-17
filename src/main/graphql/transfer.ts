import { GraphQLFieldConfig, GraphQLNonNull, GraphQLList, GraphQLInt } from 'graphql'
import { TransferCriteria, TransferLogs, Order, Range } from '../../types'
import { Prisma } from '@prisma/client'

export const transfers: GraphQLFieldConfig<any, any, any> = {
  type: TransferLogs,
  args: {
    criterias: {
      type: new GraphQLList(TransferCriteria)
    },
    order: {
      type: Order,
      defaultValue: Order.getValue('DESC').value
    },
    range: {
      type: Range
    },
    skip: {
      type: GraphQLInt
    },
    take: {
      type: GraphQLInt,
      defaultValue: 10
    }
  },
  async resolve(s, { criterias, skip, take, order, range }, { prisma }) {
    const rangeFilter = range ? {
      clause: {
        tx: {
          block: {
            [range.unit === 'block' ? 'number' : 'timestamp']: {
              gte: range.from,
              lte: range.to
            }
          }
        }
      }
    } : undefined
    const queryObj = criterias?.map(c => {
      let result: Record<string, string> = {}
      c?.txOrigin && (result['txOrigin'] = c.txOrigin)
      c?.recipient && (result['recipient'] = c.recipient)
      c?.sender && (result['sender'] = c.sender)

      return result
    }).filter(item => !! Object.keys(item).length)

    const [count, logs] = await prisma.$transaction([
      prisma.transfer.count({
        where: {
          OR: queryObj,
          AND: rangeFilter
        }
      }),
      prisma.transfer.findMany({
        where: {
          OR: queryObj,
          AND: rangeFilter
        },
        select: {
          sender: true,
          recipient: true,
          amount: true,
          clause: {
            select: {
              index: true,
              txID: true,
              tx: {
                select: {
                  index: true,
                  id: true,
                  origin: true,
                  block: {
                    select: {
                      id: true,
                      number: true,
                      timestamp: true
                    }
                  }
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: order!
        },
        take: take!,
        skip: skip!
      })
    ], {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable
    })

    return {
      count,
      logs
    }
  }
}