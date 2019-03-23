import { validate, GraphQLSchema, DocumentNode } from 'graphql'

export function validateDocument(
  document: DocumentNode,
  schema: GraphQLSchema
) {
  const validationErrors = validate(schema, document)
  for (const e of validationErrors) {
    throw { message: `Error validating document: ${e.message}` }
  }
}
