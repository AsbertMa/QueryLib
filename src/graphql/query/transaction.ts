import { extendType, intArg, nonNull, stringArg, arg } from "nexus"
import { Prisma } from "@prisma/client"

export const txByID = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('transaction', {
      type: 'Transaction',
      args: {
        id: nonNull(stringArg())
      },
      resolve(parent, args, ctx) {
        const { id } = args
        return ctx.prisma.tx.findUnique({
          where: {
            id: id
          },
          include: {
            block: true,
            clauses: {
              orderBy: {
                index: 'asc'
              }
            }
          }
        }) as any
      }
    })
  }
})

export const txList = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('transactions', {
      type: 'Transactions',
      args: {
        origin: stringArg(),
        range: arg({
          type: 'Range'
        }),
        order: arg({
          type: 'Order',
          default: 'desc'
        }),
        take: intArg({default: 10}),
        skip: intArg()
      },
      async resolve(parent, args, ctx) {
        const {origin, order, take, skip, range} = args
        const rangeFilter = range ? {
          block: {
            [range.unit === 'block' ? 'number' : 'timestamp']: {
              gte: range.from,
              lte: range.to
            }
          }
        } : undefined
        const [count, list] = await ctx.prisma.$transaction([
          ctx.prisma.tx.count({
            where: {
              origin,
              block: {
                isTrunk: true
              },
              AND: rangeFilter
            },
            distinct: ['id']
          }),
          ctx.prisma.tx.findMany({
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
                  index: 'asc'
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
        } as any
      }
    })
  },
})