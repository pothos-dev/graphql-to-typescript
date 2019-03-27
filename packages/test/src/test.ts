import { loadSchema } from 'graphql-to-typescript/src/graphql/Schema'
import { loadDocument } from 'graphql-to-typescript/src/graphql/Document'
import { validateDocument } from 'graphql-to-typescript/src/graphql/Validation'
import { transformSchema } from 'graphql-to-typescript/src/transform/SchemaIR'
import { transformDocument } from 'graphql-to-typescript/src/transform/DocumentIR'
import { generateCode } from 'graphql-to-typescript/src/generate'
import { writeFileSync } from 'fs'

function loadTestSchema() {
  return loadSchema('src/schema.gql')
}

function loadTestDocument() {
  return loadDocument('src/document.gql')
}

test('load document', async () => {
  const document = await loadTestDocument()
  expect(document).toMatchSnapshot('document')
})

test('load schema', async () => {
  const schema = await loadTestSchema()
  expect(schema).toMatchSnapshot('schema')
})

test('validate document', async () => {
  const schema = await loadTestSchema()
  const { document, sourceCode } = await loadTestDocument()
  expect(sourceCode).toMatchSnapshot('sourceCode')
  expect(() => validateDocument(document, schema)).not.toThrow()
})

test('transform schema', async () => {
  const schema = await loadTestSchema()
  const schemaIR = transformSchema(schema)
  expect(schemaIR).toMatchSnapshot('schemaIR')
})

test('transform document', async () => {
  const { document } = await loadTestDocument()
  const documentIR = transformDocument(document)
  expect(documentIR).toMatchSnapshot('documentIR')
})

test('generate code', async () => {
  const { document, sourceCode } = await loadTestDocument()
  const documentIR = transformDocument(document)
  const schema = await loadTestSchema()
  const schemaIR = transformSchema(schema)
  const code = await generateCode(schemaIR, documentIR, sourceCode)
  expect(code).toMatchSnapshot('code')
  writeFileSync('src/output.ts', code)
})
