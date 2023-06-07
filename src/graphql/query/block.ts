import { extendType, nonNull, stringArg } from "nexus"
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
            txs: []
          }
        })
      }
    })
  }
})