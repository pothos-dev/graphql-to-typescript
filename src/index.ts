import { loadDocument } from './graphql/Document'
import { loadSchema } from './graphql/Schema'
import { transformDocument } from './transform/DocumentIR'
import { generate } from './generate'
import { transformSchema } from './transform/SchemaIR'
import { writeFile } from 'fs-extra'
import { validateDocument } from './graphql/Validation'

main()

async function main() {
  try {
    const [{ sourceCode, document }, schema] = await Promise.all([
      loadDocument('src/test/document.gql'),
      loadSchema('src/text/schema.gql'),
    ])

    validateDocument(document, schema)

    const schemaIR = transformSchema(schema)
    const documentIR = transformDocument(document)
    const output = await generate(schemaIR, documentIR, sourceCode)

    await Promise.all([
      writeFile('src/output/schemaIR.json', JSON.stringify(schemaIR, null, 2)),
      writeFile(
        'src/output/documentIR.json',
        JSON.stringify(documentIR, null, 2)
      ),
      writeFile('src/output/output.ts', output),
    ])
  } catch (e) {
    console.error('Caught exception: ' + e.message)
  }
}
