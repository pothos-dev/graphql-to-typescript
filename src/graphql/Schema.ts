import axios from 'axios'
import {
  getIntrospectionQuery,
  buildClientSchema,
  IntrospectionQuery,
  buildSchema,
} from 'graphql/utilities'
import { GraphQLSchema } from 'graphql'
import { readFileSync, writeFileSync } from 'fs'

export async function downloadSchema(url: string): Promise<GraphQLSchema> {
  const query = getIntrospectionQuery({ descriptions: false })
  const data = { query }
  const response = await axios.post(url, data)
  const introspection = response.data.data as IntrospectionQuery
  const schema = buildClientSchema(introspection, { assumeValid: true })
  return schema
}

export function loadSchema(filePath: string): GraphQLSchema {
  return buildClientSchema(
    JSON.parse(readFileSync(filePath, { encoding: 'utf8' }))
  )
}

export function saveSchema(schema: GraphQLSchema, filePath: string) {
  writeFileSync(filePath, JSON.stringify(schema, null, 2))
}
