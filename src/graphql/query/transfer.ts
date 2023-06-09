import { extendType, nullable, list, intArg, arg } from "nexus"
import { Order } from "../type"

export const transfers = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('transfers', {
      type: 'TransferLogs',
      args: {
        criterias: nullable(list('TransferCriteria')),
        order: arg({
          type: Order,
          default: 'asc'
        }),
        skip: intArg(),
        take: intArg({
          default: 10
        }),
      },
      async resolve(source, args, ctx) {
        const { criterias, skip, take, order } = args
        const queryObj = criterias?.map(c => {
          let result: Record<string, string> = {}
          c?.txOrigin && (result['txOrigin'] = c.txOrigin)
          c?.recipient && (result['recipient'] = c.recipient)
          c?.sender && (result['sender'] = c.sender)

          return Object.keys(result).length ? result : null
        }).filter(item => !!item)

        const count = await ctx.prisma.transfer.count({
          where: {
            OR: queryObj
          }
        })
        const logs = await ctx.prisma.transfer.findMany({
          where: {
            OR: queryObj
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
            createAt: order
          },
          take,
          skip
        })

        return {
          count,
          logs
        }
      }
    })
  },
})