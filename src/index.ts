import { readFileSync, writeFileSync } from 'fs'
import { parse, validate, buildClientSchema } from 'graphql'
import { loadIntrospection } from './graphql/Introspection'
import { loadDocument } from './graphql/Document'
import { loadSchema } from './graphql/Schema'
import { transformDocument } from './transform/DocumentIR'
import { render } from 'prettyjson'
import { generate } from './generate'
import { transformSchema } from './transform/SchemaIR'
import { writeFile } from 'fs-extra'

main()

// downloadSchema('https://api.graphloc.com/graphql').then((schema) => {
//   const schemaIR = transformSchema(schema)
//   writeFileSync('schemaIR.json', JSON.stringify(schemaIR, null, 2))
//   // console.log(prettyJson.render(schemaIR))
// })

// // const schema = loadSchema('schema.json')
// // const schemaIR = transformSchema(schema)
// // writeFileSync('schemaIR.json', JSON.stringify(schema, null, 2))

// // console.log(prettyJson.render(loadSchema('schema.json')))

// const schemaIR = JSON.parse(readFileSync('schemaIR.json', { encoding: 'utf8' }))
// writeFileSync('output.ts', generate(schemaIR))

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
    await writeFile('output.ts', output)
  } catch (e) {
    console.error(e.message)
  }
}
