import { loadIntrospection } from './Introspection'
import { buildClientSchema, buildSchema } from 'graphql'
import { readFile } from 'fs-extra'

export async function loadSchema(uri: string) {
  if (uri.endsWith('.gql') || uri.endsWith('.graphql')) {
    return loadSchemaFromFile(uri)
  }

  // todo: This function expects a complete introspection result. Don't forget to check the "errors" field of a server response before calling this function.
  const introspection = await loadIntrospection(uri)
  return buildClientSchema(introspection, { assumeValid: true })
}

async function loadSchemaFromFile(filePath: string) {
  const fileContent = await readFile('src/test/schema.gql', {
    encoding: 'utf8',
  })
  return buildSchema(fileContent)
}
