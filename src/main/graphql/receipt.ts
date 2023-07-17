import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql'
import { Receipt } from '../../types'

export const receipt: GraphQLFieldConfig<any, any, any> = {
  type: Receipt,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (s, { id }, { prisma }) => {
    return prisma.tx.findUnique({
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
}