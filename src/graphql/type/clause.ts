import { objectType } from "nexus"
export const Clause = objectType({
  name: 'Clause',
  definition(t) {
    t.nullable.string('to'),
    t.nullable.string('value'),
    t.nullable.string('data')
  }
})