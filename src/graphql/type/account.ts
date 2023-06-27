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
  }
})