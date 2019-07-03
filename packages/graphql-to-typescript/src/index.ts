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
type Headers = Record<string, string>

export default async function generate(opts: {
  schema: URL | FilePath | GraphQLSchema
  headers?: Headers
  documents: FilePath[]
  outFile?: FilePath
}): Promise<{
  schemaIR: SchemaIR
  documentsIR: DocumentIR[]
  result: string
}> {
  const schema =
    typeof opts.schema == 'object'
      ? opts.schema
      : await loadSchema(opts.schema, opts.headers)
  const schemaIR = transformSchema(schema)

  const documentsIR = await Promise.all(
    opts.documents.map(async (documentFile) => {
      const { sourceCode, document } = await loadDocument(documentFile)
      validateDocument(document, schema)
      return transformDocument(document, sourceCode)
    })
  )

  const result = await generateCode(schemaIR, documentsIR)
  if (opts.outFile) {
    await fs.writeFile(opts.outFile, result)
  }
  return { schemaIR, documentsIR, result }
}
