import { validate } from 'graphql'
import { loadDocument } from './graphql/Document'
import { loadSchema } from './graphql/Schema'
import { transformDocument } from './transform/DocumentIR'
import { generate } from './generate'
import { transformSchema } from './transform/SchemaIR'
import { writeFile } from 'fs-extra'

main()

async function main() {
  try {
    const [{ sourceCode, document }, schema] = await Promise.all([
      loadDocument('document.gql'),
      loadSchema('https://api.graphloc.com/graphql'),
    ])
    const validationErrors = validate(schema, document)
    for (const e of validationErrors) {
      throw { message: `Error validating document: ${e.message}` }
    }

    const schemaIR = transformSchema(schema)
    const documentIR = transformDocument(document)
    const output = await generate(schemaIR, documentIR, sourceCode)

    await Promise.all([
      writeFile('output/schemaIR.json', JSON.stringify(schemaIR, null, 2)),
      writeFile('output/documentIR.json', JSON.stringify(documentIR, null, 2)),
      writeFile('output/output.ts', output),
    ])
  } catch (e) {
    console.error(e.message)
  }
}
