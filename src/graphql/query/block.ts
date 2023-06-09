import { arg, extendType, intArg, nonNull, stringArg } from "nexus"
import { Order } from "../type"
export const blockById = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('block', {
      type: 'Block',
      args: {
        id: nonNull(stringArg())
      },
      resolve(parent, args, ctx) {
        const { id } = args
        return ctx.prisma.block.findUnique({
          where: {
            id
          },
          include: {
            txs: true
          }
        })
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
        skip: intArg(),
        order: arg({
          type: Order,
          default: 'asc'
        })
      },
      async resolve (p, args, ctx) {
        const { take, skip, order, signer } = args
        const count = await ctx.prisma.block.count({
          where: {
            signer
          }
        })
        const list = await ctx.prisma.block.findMany({
          where: {
            signer
          },
          include:{
            txs: true
          },
          orderBy: {
            number: order
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