import { GraphQLObjectType } from 'graphql'
import { TypeIR, transformType } from './TypeIR'

export interface ObjectTypeIR {
  kind: 'object'
  fields: Record<string, TypeIR>
  interfaces?: unknown
}
export function transformObjectType(T: GraphQLObjectType): ObjectTypeIR {
  const fieldMap = T.getFields()

  const fieldsIR: Record<string, TypeIR> = {}
  for (const [name, field] of Object.entries(fieldMap)) {
    fieldsIR[name] = transformType(field.type)
  }

  return {
    kind: 'object',
    fields: fieldsIR,
  }
}
