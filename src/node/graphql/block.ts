import { GraphQLFieldConfig, GraphQLInt, GraphQLString } from 'graphql'
import { Block, Blocks, Order, Range } from '../../types'
import { Prisma } from '@prisma/client'
import { getBlockNum } from '../../utils'

export const block: GraphQLFieldConfig<any, any, any> = {
  type: Block,
  args: {
    revision: {
      type: GraphQLString,
      description: `block ID or number, or 'best' stands for latest block, or 'finalized' stands for finalized block`
    }
  },
  resolve: async (source, { revision }, { prisma }) => {
    const finalized = await prisma.status.findUnique({
      where: {
        key: 'finalized'
      }
    })
    const finalizedNum = getBlockNum(finalized?.value!)
    const include = {
      txs: {
        include: {
          block: true,
          clauses: {
            orderBy: {
              index: Prisma.SortOrder.asc
            },
            include: {
              transfers: true,
              events: true,
              contractCreate: true
            }
          },
        }
      }
    }
    let theB
    switch (revision) {
      case 'best':
        theB = await prisma.block.findFirst({
          include,
          orderBy: { number: Prisma.SortOrder.desc }
        })
        break;
      case 'finalized':
        theB = await prisma.block.findUnique({
          where: {
            id: finalized.value,
            isTrunk: true
          },
          include
        })
        break;
      default:
        if (revision.length === 66 || revision.length === 64) {
          let temp
          revision.length === 64 ? (temp = revision) : (revision.startsWith('0x') && (temp = revision.slice(2)))
          const hexChars = /^[0-9a-fA-F]+$/
          if (hexChars.test(temp)) {
            theB = prisma.block.findUnique({
              where: {
                id: '0x' + temp
              },
              include
            })
          }
        } else {
          const temp = parseInt(revision)
          theB = prisma.block.findFirst({
            where: {
              number: temp,
              isTrunk: true
            },
            include
          })
        }
        break;
    }

    return {
      ...theB,
      isFinalized: theB?.number! < finalizedNum
    }
  }
}

export const blocks: GraphQLFieldConfig<any, any, any> = {
  type: Blocks,
  args: {
    take: {
      type: GraphQLInt,
      defaultValue: 10
    },
    signer: {
      type: GraphQLString
    },
    range: {
      type: Range
    },
    skip: {
      type: GraphQLInt
    },
    order: {
      type: Order,
      defaultValue: Order.getValue('DESC').value
    }
  },
  resolve: async (source, { take, signer, range, skip, order }, ctx) => {
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
        }
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
        }
      })
    }
  }
}