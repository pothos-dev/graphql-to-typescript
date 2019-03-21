import { GraphQLSchema } from 'graphql'
import { values, zipObj, keys } from 'rambda'
import { NamedTypeIR, transformNamedType } from './NamedTypeIR'

export interface SchemaIR {
  types: Record<string, NamedTypeIR>
}

export function transformSchema(schema: GraphQLSchema): SchemaIR {
  const types = zipObj(
    keys(schema.getTypeMap()) as string[],
    values(schema.getTypeMap())
      .filter((T) => !T.name.startsWith('__'))
      .map(transformNamedType)
  )

  return { types }
}
