import fs from 'fs-extra'
import { parse, DocumentNode } from 'graphql'

export async function loadDocument(
  filepath: string
): Promise<{
  sourceCode: string
  document: DocumentNode
}> {
  try {
    const sourceCode = await fs.readFile(filepath, { encoding: 'utf8' })
    const document = parse(sourceCode)
    return { sourceCode, document }
  } catch (e) {
    throw { message: `Error parsing document at ${filepath}: ${e.message}` }
  }
}
