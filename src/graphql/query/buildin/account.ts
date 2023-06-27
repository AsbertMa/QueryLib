import { energy, balance, sponsor, master, hasCode, auGet, ADDR_PROTOTYPE, ADDR_AUTHORITY } from './abi'
import { extendType, stringArg, nonNull } from 'nexus'

const zeroAddr = '0x00000000000000000000000000000000'
const zeroIdentity = '0x0000000000000000000000000000000000000000000000000000000000000000'

export const account = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('account', {
      type: 'Account',
      args: {
        address: nonNull(stringArg())
      },
      async resolve(s, args, ctx) {
        let code
        let deployer = zeroAddr
        let authority = null
        const addr = args.address
        const b = ctx.connex.thor.status.head.number
        const contractPrototype = ctx.connex.thor.account(ADDR_PROTOTYPE)
        const contractAuthority = ctx.connex.thor.account(ADDR_AUTHORITY)

        const me = contractPrototype.method(energy.definition)
        const mb = contractPrototype.method(balance.definition)
        const ms = contractPrototype.method(sponsor.definition)
        const mm = contractPrototype.method(master.definition)
        const mhasCode = contractPrototype.method(hasCode.definition)
        const mAuth = contractAuthority.method(auGet.definition)

        const exp = ctx.connex.thor.explain([
          mb.asClause(addr, b),
          me.asClause(addr, b),
          mhasCode.asClause(addr),
          mm.asClause(addr),
          ms.asClause(addr),
          mAuth.asClause(addr)
        ])
        const resp = await exp.execute()
        
        const authorityDecoded = auGet.decode(resp[5].data)
        if (hasCode.decode(resp[2].data)[0]) {
          code = (await ctx.connex.thor.account(addr).getCode()).code
          const t = await ctx.prisma.contractCreation.findFirst({
            where: {
              address: addr,
              clause: {
                tx: {
                  block: {
                    isTrunk: true
                  }
                }
              }
            },
            select: {
              clause: {
                select: {
                  tx: {
                    select: {
                      origin: true
                    }
                  }
                }
              }
            }
          })
          t && t.clause && (deployer = t.clause.tx.origin)
        }

        if (authorityDecoded.identity !== zeroIdentity && authorityDecoded.endorsor !== zeroAddr) {
          authority = authorityDecoded
          const count = await ctx.prisma.block.count({
            where: {
              signer: addr
            }
          })

          authority['signedBlockCount'] = count
        }

        return {
          balance: balance.decode(resp[0].data)[0],
          energy: energy.decode(resp[1].data)[0],
          code: code,
          master: master.decode(resp[3].data)[0],
          sponsor: master.decode(resp[4].data)[0],
          deployer,
          authority
        }
      }
    })
  },
})
