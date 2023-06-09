import { arg, extendType, intArg, nonNull, stringArg } from "nexus"
import {getBlockNum} from '../../utils'
import { Order, Block } from "../type"
import { Prisma } from "@prisma/client"
export const blockById = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('block', {
      type: 'Block',
      args: {
        id: nonNull(stringArg())
      },
      async resolve(parent, args, ctx) {
        const { id } = args
        const finalized = await ctx.prisma.status.findUnique({
          where: {
            key: 'finalized'
          }
        })
        const finalizedNum = getBlockNum(finalized?.value!)
        const theB = await ctx.prisma.block.findUnique({
          where: {
            id
          },
          include: {
            txs: {
              include: {
                clauses: {
                  include: {
                    transfers: true,
                    events: true,
                    contractCreate: true
                  }
                },
              }
            }
          }
        })

        return {
          ...theB,
          isFinalized: theB?.number! < finalizedNum
        } as any
      }
    })
  }
})

export const blocks = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('blocks', {
      type: 'Blocks',
      args: {
        take: intArg({ default: 10 }),
        signer: stringArg(),
        range: arg({
          type: 'Range'
        }),
        skip: intArg(),
        order: arg({
          type: Order,
          default: 'desc'
        })
      },
      async resolve(p, args, ctx) {
        const { take, skip, order, signer, range } = args
        const rangeFilter = range ? {
          [range.unit === 'block' ? 'number' : 'timestamp']: {
            gte: range.from,
            lte: range.to
          }
        } : undefined

        const [count, finalized, list] = await ctx.prisma.$transaction([
          ctx.prisma.block.count({
            where: {
              signer,
              isTrunk: true,
              AND: rangeFilter
            },
            distinct: ['id']
          }),
          ctx.prisma.status.findUnique({
            where: {
              key: 'finalized'
            }
          }),
          ctx.prisma.block.findMany({
            where: {
              signer,
              isTrunk: true,
              AND: rangeFilter
            },
            include: {
              txs: {
                include: {
                  clauses: {
                    include: {
                      transfers: true,
                      events: true,
                      contractCreate: true
                    }
                  },
                }
              }
            },
            orderBy: {
              number: order!
            },
            take: take!,
            skip: skip!
          })
        ], {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable
        })

        const finalizedNum = getBlockNum(finalized?.value!)

        return {
          count,
          list: list.map((b) => {
            return {
              ...b,
              isFinalized: b?.number! < finalizedNum
            } as any
          })
        }
      }
    })
  },
})