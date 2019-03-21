import axios from 'axios'
import {
  getIntrospectionQuery,
  buildClientSchema,
  IntrospectionQuery,
} from 'graphql/utilities'
import { GraphQLSchema } from 'graphql'

export async function parseFromUrl(url: string): Promise<GraphQLSchema> {
  const query = getIntrospectionQuery({ descriptions: false })
  const data = { query }
  const response = await axios.post(url, data)
  const introspection = response.data.data as IntrospectionQuery
  const schema = buildClientSchema(introspection, { assumeValid: true })
  return schema
}
