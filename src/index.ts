import prettyJson from 'prettyjson'
import { writeFileSync, readFileSync } from 'fs'
import { GraphQLSchema } from 'graphql'

export function readSchemaFile(filePath: string): GraphQLSchema {
  return JSON.parse(readFileSync(filePath, { encoding: 'utf8' }))
}

export function writeSchemaFile(schema: GraphQLSchema) {
  writeFileSync('schema.json', JSON.stringify(schema, null, 2))
}

console.log(prettyJson.render(readSchemaFile('schema.json')))
