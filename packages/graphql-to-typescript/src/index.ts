#!/usr/bin/env node
import { loadDocument } from './graphql/Document'
import { loadSchema } from './graphql/Schema'
import { transformDocument, DocumentIR } from './transform/DocumentIR'
import { transformSchema, SchemaIR } from './transform/SchemaIR'
import { validateDocument } from './graphql/Validation'
import { GraphQLSchema } from 'graphql'
import { generateCode } from './generate'
import fs from 'fs-extra'

export * from './types'

type URL = string
type FilePath = string

export default async function generate(opts: {
  schema: URL | FilePath | GraphQLSchema
  document: FilePath
  outFile?: FilePath
}): Promise<{
  schemaIR: SchemaIR
  documentIR: DocumentIR
  result: string
}> {
  const schema =
    typeof opts.schema == 'object' ? opts.schema : await loadSchema(opts.schema)
  const { sourceCode, document } = await loadDocument(opts.document)
  validateDocument(document, schema)
  const schemaIR = transformSchema(schema)
  const documentIR = transformDocument(document, sourceCode)
  const result = await generateCode(schemaIR, documentIR)
  if (opts.outFile) {
    await fs.writeFile(opts.outFile, result)
  }
  return { schemaIR, documentIR, result }
}
