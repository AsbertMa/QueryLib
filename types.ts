export interface DBModels {
  Clause: {
    id: number
    txID: string
    index: number
    to: string | null
    value: string | null
    data: string | null
  }

  Tx: {
    id: string
    index: number
    blockID: string
    chainTag: number,
    blockRef: string
    expiration: number,
    gasPriceCoef: number,
    gas: number,
    origin: string
    delegator: string | null,
    nonce: string,
    dependsOn: string | null,
    size: number
    // Receipt
    gasUsed: number
    gasPayer: string
    paid: string
    reward: string
    reverted: boolean
  }

  Block: {
    id: string
    number: number
    beneficiary: string
    com: boolean
    gasLimit: number
    gasUsed: number
    isFinalized: boolean
    isTrunk: boolean
    parentID: string
    receiptsRoot: string
    signer: string
    size: number
    stateRoot: string
    timestamp: number
    totalScore: number
    txsFeatures: number
    txsRoot: string
  }

  Event: {
    id: number
    clauseID: number
    index: number
    contractAddr: string
    topic0: string
    topic1?: string
    topic2?: string
    topic3?: string
    data?: string
  }

  Transfer: {
    id: number
    clauseID: number
    index: number
    sender: string
    recipient: string
    amount: string
  }

  ContractCreation: {
    id: number
    clauseID: number
    address: string
  }
}