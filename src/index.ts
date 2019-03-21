import { loadSchema } from './graphql/Schema'
import { writeFileSync } from 'fs'
import transformSchema from './transform/SchemaIR'

// downloadSchema('https://api.graphloc.com/graphql').then((schema) =>
//   saveSchema(schema, 'schema.json')
// )

const schema = loadSchema('schema.json')
const schemaIR = transformSchema(schema)
writeFileSync('schemaIR.json', JSON.stringify(schema, null, 2))

// console.log(prettyJson.render(loadSchema('schema.json')))
