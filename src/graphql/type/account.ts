import { objectType } from "nexus"

export const Account = objectType({
  name: 'Account',
  definition(t) {
    t.nullable.string('balance')
    t.nullable.string('energy')
    t.nullable.string('code')
    t.nullable.string('master')
    t.nullable.string('sponsor')
    t.nullable.string('deployer')
    t.nullable.field('authority', {
      type: 'Authority'
    })
  }
})

export const Authority = objectType({
  name: 'Authority',
  definition(t) {
    t.nonNull.boolean('listed'),
    t.nullable.string('endorsor'),
    t.nullable.string('identity'),
    t.nonNull.boolean('active'),
    t.nonNull.id('signedBlockCount')
  },
})