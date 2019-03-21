import { GraphQLSchema } from 'graphql'
import { values } from 'rambda'
import { NamedTypeIR, transformNamedType } from './NamedTypeIR'

export interface SchemaIR {
  types: NamedTypeIR[]
}
export default function transformSchema(schema: GraphQLSchema): SchemaIR {
  const types = values(schema.getTypeMap())
    .filter((T) => !T.name.startsWith('__'))
    .map(transformNamedType)

  return { types }
}
