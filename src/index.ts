import { loadSchema, downloadSchema, saveSchema } from './graphql/Schema'
import { writeFileSync, readFileSync, writeFile } from 'fs'
import prettyJson from 'prettyjson'
import { transformSchema } from './transform/SchemaIR'
import { generate } from './generate'

// downloadSchema('https://api.graphloc.com/graphql').then((schema) => {
//   const schemaIR = transformSchema(schema)
//   writeFileSync('schemaIR.json', JSON.stringify(schemaIR, null, 2))
//   // console.log(prettyJson.render(schemaIR))
// })

// // const schema = loadSchema('schema.json')
// // const schemaIR = transformSchema(schema)
// // writeFileSync('schemaIR.json', JSON.stringify(schema, null, 2))

// // console.log(prettyJson.render(loadSchema('schema.json')))

const schemaIR = JSON.parse(readFileSync('schemaIR.json', { encoding: 'utf8' }))
writeFileSync('output.ts', generate(schemaIR))
