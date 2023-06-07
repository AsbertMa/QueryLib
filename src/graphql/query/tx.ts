import { extendType, nonNull, stringArg } from "nexus"
export const txByID = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('tx', {
      type: 'Tx',
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