import fs from 'fs-extra'
import { parse } from 'graphql'

export async function loadDocument(filepath: string) {
  try {
    const fileContent = await fs.readFile(filepath, { encoding: 'utf8' })
    return parse(fileContent)
  } catch (e) {
    throw { message: `Error parsing document at ${filepath}: ${e.message}` }
  }
}
