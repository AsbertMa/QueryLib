import { PrismaClient } from '@prisma/client'
import { Framework } from '@vechain/connex-framework'
import { Driver, SimpleNet } from '@vechain/connex-driver'

export const getContext = async (): Promise<Context> => {
  const net = new SimpleNet('http://127.0.0.1:8669/')
  const driver = await Driver.connect(net)
  const connex = new Framework(driver)
  const prisma = new PrismaClient()

  return {
    prisma,
    connex
  }
}

export interface Context {
  prisma: PrismaClient,
  connex: Connex
}

// export const context: Context = {
//   prisma,
//   connex
// }