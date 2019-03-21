import { loadSchema, downloadSchema, saveSchema } from './graphql/Schema'
import { writeFileSync } from 'fs'
import transformSchema from './transform/SchemaIR'
import prettyJson from 'prettyjson'

downloadSchema('https://api.graphloc.com/graphql').then((schema) => {
  const schemaIR = transformSchema(schema)
  console.log(prettyJson.render(schemaIR))
})

// const schema = loadSchema('schema.json')
// const schemaIR = transformSchema(schema)
// writeFileSync('schemaIR.json', JSON.stringify(schema, null, 2))

// console.log(prettyJson.render(loadSchema('schema.json')))
