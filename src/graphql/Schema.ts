import { loadIntrospection } from './Introspection'
import { buildClientSchema } from 'graphql'

export async function loadSchema(uri: string) {
  // todo: This function expects a complete introspection result. Don't forget to check the "errors" field of a server response before calling this function.
  const introspection = await loadIntrospection(uri)
  return buildClientSchema(introspection, { assumeValid: true })
}
