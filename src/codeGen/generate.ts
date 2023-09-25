import { renderFile } from 'ejs'
import { writeFile } from 'fs/promises'
import * as prettier from 'prettier'

export async function genCode(fileName: string, abis, template: string, name?: string, address?: string) {
  return new Promise((resolve, reject) => {
    renderFile(template, { abis, address, name }, { escape: (str) => { return str } }, async (err, content) => {
      if (err) {
        reject(err)
      }
      if (content) {
        const formattedContent = await prettier.format(content, { parser: 'typescript' })
        writeFile(fileName, formattedContent).then(resolve).catch(reject)
      }
    })
  })
}

export async function createIndex(fileName: string, names: string[], template: string) {
  return new Promise((resolve, reject) => {
    renderFile(template, { names }, { escape: (str) => { return str } }, async (err, content) => {
      if (err) {
        reject(err)
      }
      if (content) {
        const formattedContent = await prettier.format(content, { parser: 'typescript' })
        writeFile(fileName, formattedContent).then(resolve).catch(reject)
      }
    })
  })
}
