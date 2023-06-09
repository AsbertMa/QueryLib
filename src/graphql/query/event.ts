import { extendType, nullable, arg, list, intArg } from "nexus"
import { Order } from "../type"

export const events = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('events', {
      type: 'EventLogs',
      args: {
        criterias: nullable(list('EventCriteria')),
        order: arg({
          type: Order,
          default: 'asc'
        }),
        skip: intArg(),
        take: intArg({
          default: 10
        })
      },
      async resolve(parent, args, ctx) {
        const { criterias, skip, take, order } = args
        const queryObj = criterias?.map(c => {
          let result: Record<string, string> = {}

          c?.address && (result['contractAddr'] = c?.address)
          c?.topic0 && (result['topic0'] = c?.topic0)
          c?.topic1 && (result['topic1'] = c?.topic1)
          c?.topic2 && (result['topic2'] = c?.topic2)
          c?.topic3 && (result['topic3'] = c?.topic3)
          c?.topic4 && (result['topic4'] = c?.topic4)
          
          return Object.keys(result).length ? result : null
        }).filter(item => !!item)

        const count = await ctx.prisma.event.count({
          where: {
            OR: queryObj
          }
        })
        const logs = await ctx.prisma.event.findMany({
          where: {
            OR: queryObj
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
            createdAt: order
          },
          skip,
          take
        })
        return {
          count,
          logs
        }
      }
    })
  }
})