import { extendType, intArg, nonNull, stringArg, arg } from "nexus"
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
          }
        })
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
        order: arg({
          type: 'Order',
          default: 'asc'
        }),
        take: intArg({default: 10}),
        skip: intArg()
      },
      async resolve(parent, args, ctx) {
        const {origin, order, take, skip} = args
        const count = await ctx.prisma.tx.count({
          where: {
            origin
          }
        })
        const list = await ctx.prisma.tx.findMany({
          where: {
            origin
          },
          orderBy: {
            createdAt: order
          },
          take,
          skip
        })

        return {
          count,
          list
        }
      }
    })
  },
})