import { GraphQLFieldConfig, GraphQLInt, GraphQLList } from 'graphql'
import { EventCriteria, EventLogs, Order, Range } from '../../types'
import { Prisma } from '@prisma/client'

export const events: GraphQLFieldConfig<any, any, any> = {
  type: EventLogs,
  args: {
    criterias: {
      type: new GraphQLList(EventCriteria)
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
  async resolve(source, { criterias, skip, take, order, range }, ctx) {
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
      let result: Record<string, { equals: string }> = {}

      c?.address && (result['contractAddr']['equals'] = c?.address)
      c?.topic0 && (result['topic0']['equals'] = c?.topic0)
      c?.topic1 && (result['topic1']['equals'] = c?.topic1)
      c?.topic2 && (result['topic2']['equals'] = c?.topic2)
      c?.topic3 && (result['topic3']['equals'] = c?.topic3)
      c?.topic4 && (result['topic4']['equals'] = c?.topic4)

      return result
    }).filter(item => !!Object.keys(item).length)

    const [count, logs] = await ctx.prisma.$transaction([
      ctx.prisma.event.count({
        where: {
          OR: queryObj,
          AND: rangeFilter
        }
      }),
      ctx.prisma.event.findMany({
        where: {
          OR: queryObj,
          AND: rangeFilter
        },
        select: {
          contractAddr: true,
          data: true,
          topic0: true,
          topic1: true,
          topic2: true,
          topic3: true,
          clause: {
            select: {
              index: true,
              tx: {
                select: {
                  id: true,
                  index: true,
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
        skip: skip!,
        take: take!
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