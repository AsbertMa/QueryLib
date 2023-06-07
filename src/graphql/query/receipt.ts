import { extendType, nonNull, stringArg } from "nexus"
export const receiptByTxID = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('receipt', {
      type: 'Receipt',
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
            clauses: {
              include: {
                events: true,
                transfers: true,
                contractCreate: true
              }
            },
            block: true
          }
        })
      }
    })
  }
})