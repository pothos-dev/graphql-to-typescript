import { loadDocument } from './graphql/Document'
import { loadSchema } from './graphql/Schema'
import { transformDocument } from './transform/DocumentIR'
import { generateCode } from './generate'
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
    await writeFile(
      'src/output/schemaIR.json',
      JSON.stringify(schemaIR, null, 2)
    )

    const documentIR = transformDocument(document)
    await writeFile(
      'src/output/documentIR.json',
      JSON.stringify(documentIR, null, 2)
    )

    const output = await generateCode(schemaIR, documentIR, sourceCode)
    await writeFile('src/output/output.ts', output)
  } catch (e) {
    console.error('Caught exception: ' + e.message)
  }
}
