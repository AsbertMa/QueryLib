import { genCode } from "./generate"
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
const apps = path.join(__dirname, '../apps')

export default async function appCode(name: string, abi: (abi.Event.Definition | abi.Function.Definition)[], address: string) {
  const appFolder = path.join(apps, name)
  try {
    await access(appFolder)
  } catch (error) {
    await mkdir(appFolder)
  }

  const events = abi.filter(i => i.type === 'event')

  await Promise.all([
    await genCode(path.join(appFolder, 'abi.ts'), abi, abiTemplate),
    await genCode(path.join(appFolder, 'types.ts'), events, typesTemplate),
    await genCode(path.join(appFolder, 'query.ts'), events, queryTemplate, address)
  ])
  await execTsc(path.join(appFolder, 'query.ts'))
}