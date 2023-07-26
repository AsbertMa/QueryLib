import { PrismaClient } from '@prisma/client'
import { Framework } from '@vechain/connex-framework'
import { Driver, SimpleNet } from '@vechain/connex-driver'

const prisma = new PrismaClient({
  log: [{ level: 'query', emit: 'event' }]
})
let connex: Connex

async function getConnex() {
  if (!connex) {
    const net = new SimpleNet('http://127.0.0.1:8669/')
    const driver = await Driver.connect(net)
    connex = new Framework(driver)
  }

  return connex
}

export const context = {
  prisma,
  getConnex
}

export interface GLContext {
  prisma: PrismaClient,
  getConnex: () => Promise<Connex>
}