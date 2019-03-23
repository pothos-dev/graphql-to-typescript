import { GraphQLObjectType } from 'graphql'
import { keys, values, zipObj } from 'rambda'
import { TypeIR, transformType } from './TypeIR'

export interface ObjectTypeIR {
  kind: 'object'
  fields: Record<string, TypeIR>
  interfaces?: unknown
}
export function transformObjectType(T: GraphQLObjectType): ObjectTypeIR {
  const fields = T.getFields()

  const fieldsIR = zipObj(
    keys(fields) as string[],
    values(fields)
      .map((field) => field.type)
      .map(transformType)
  )
  return {
    kind: 'object',
    fields: fieldsIR,
  }
}
