import { GraphQLSchema } from 'graphql'
import { values, zipObj, keys } from 'rambda'
import { transformType, TypeIR } from './TypeIR'

export interface SchemaIR {
  types: Record<string, TypeIR>
}

export function transformSchema(schema: GraphQLSchema): SchemaIR {
  const types = zipObj(
    keys(schema.getTypeMap()) as string[],
    values(schema.getTypeMap())
      .filter((T) => !T.name.startsWith('__'))
      .map((T) => transformType(T, true))
  )

  return { types }
}
