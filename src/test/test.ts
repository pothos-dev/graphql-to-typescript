import { loadSchema } from '../graphql/Schema'
import { loadDocument } from '../graphql/Document'
import { validateDocument } from '../graphql/Validation'
import { transformSchema } from '../transform/SchemaIR'
import { transformDocument } from '../transform/DocumentIR'
import { generateCode } from '../generate'

function loadTestSchema() {
  return loadSchema('src/test/schema.gql')
}

function loadTestDocument() {
  return loadDocument('src/test/document.gql')
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
})
