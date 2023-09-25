import { genCode, createIndex } from "./generate"
import path from 'path'
import { mkdir, access } from 'fs/promises'
import { abi } from "thor-devkit"
import { exec } from 'child_process'

const tscPath = path.join(__dirname, '../../node_modules/.bin/tsc')

async function execTsc(file: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`${tscPath} ${file}`, (err, stdout, stderr) => {
      if(stderr) {
        reject(err)
      } else {
        resolve(stdout)
      }
    })
  })
}

const typesTemplate = path.join(__dirname, '../../templates/types.ejs')
const queryTemplate = path.join(__dirname, '../../templates/query.ejs')
const abiTemplate = path.join(__dirname, '../../templates/abi.ejs')
const indexTemplate = path.join(__dirname, '../../templates/index.ejs')
const apps = path.join(__dirname, '../apps')

export default async function appCode(name: string, abis: {name: string, abi: string, address: string}[]) {
  const appFolder = path.join(apps, name)
  try {
    await access(appFolder)
  } catch (error) {
    await mkdir(appFolder)
  }

  const names = abis.map((item) => { return item.name })
  await Promise.all(abis.map(async (item, index) => {
    const abi: (abi.Event.Definition | abi.Function.Definition)[] = JSON.parse(item.abi)
    const events = abi.filter(i => i.type === 'event')
    return Promise.all([
      await genCode(path.join(appFolder, item.name + '.abi.ts'), abi, abiTemplate),
      await genCode(path.join(appFolder, item.name + '.types.ts'), events, typesTemplate, item.name),
      await genCode(path.join(appFolder, item.name + '.query.ts'), events, queryTemplate, item.name, item.address)
    ])
  }))
  await createIndex(path.join(appFolder,'index.ts'), names, indexTemplate)
  await execTsc(path.join(appFolder, 'index.ts'))
}