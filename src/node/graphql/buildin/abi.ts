import { abi } from 'thor-devkit'

const abiEnergy = {
  "constant": true,
  "inputs": [
    {
      "name": "_self",
      "type": "address"
    },
    {
      "name": "_blockNumber",
      "type": "uint256"
    }
  ],
  "name": "energy",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}

const abiBalance = {
  "constant": true,
  "inputs": [
    {
      "name": "_self",
      "type": "address"
    },
    {
      "name": "_blockNumber",
      "type": "uint256"
    }
  ],
  "name": "balance",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}
const abiHasCode = {
  "constant": true,
  "inputs": [
    {
      "name": "_self",
      "type": "address"
    }
  ],
  "name": "hasCode",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}

const abiMaster = {
  "constant": true,
  "inputs": [
    {
      "name": "_self",
      "type": "address"
    }
  ],
  "name": "master",
  "outputs": [
    {
      "name": "",
      "type": "address"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}

const aibSponsor = {
  "constant": true,
  "inputs": [
    {
      "name": "_self",
      "type": "address"
    }
  ],
  "name": "currentSponsor",
  "outputs": [
    {
      "name": "",
      "type": "address"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}

const abiGet = {
  "constant": true,
  "inputs": [
    {
      "name": "_nodeMaster",
      "type": "address"
    }
  ],
  "name": "get",
  "outputs": [
    {
      "name": "listed",
      "type": "bool"
    },
    {
      "name": "endorsor",
      "type": "address"
    },
    {
      "name": "identity",
      "type": "bytes32"
    },
    {
      "name": "active",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}

export const energy = new abi.Function(abiEnergy as abi.Function.Definition)
export const balance = new abi.Function(abiBalance as abi.Function.Definition)
export const sponsor = new abi.Function(aibSponsor as abi.Function.Definition)
export const master = new abi.Function(abiMaster as abi.Function.Definition)
export const hasCode = new abi.Function(abiHasCode as abi.Function.Definition)

export const auGet = new abi.Function(abiGet as abi.Function.Definition)

export const ADDR_PROTOTYPE = '0x000000000000000000000050726f746f74797065'
export const ADDR_AUTHORITY = '0x0000000000000000000000417574686f72697479'
