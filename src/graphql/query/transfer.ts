import { extendType, nullable, list, intArg, arg } from "nexus"
import { Order } from "../type"
import { Prisma } from "@prisma/client"

export const transfers = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('transfers', {
      type: 'TransferLogs',
      args: {
        criterias: nullable(list('TransferCriteria')),
        range: arg({
          type: 'Range'
        }),
        order: arg({
          type: Order,
          default: 'desc'
        }),
        skip: intArg(),
        take: intArg({
          default: 10
        }),
      },
      async resolve(source, args, ctx) {
        const { criterias, skip, take, order, range } = args
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

        const [count, logs] = await ctx.prisma.$transaction([
          ctx.prisma.transfer.count({
            where: {
              OR: queryObj,
              AND: rangeFilter
            }
          }),
          ctx.prisma.transfer.findMany({
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
    })
  },
})