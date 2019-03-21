import {
  GraphQLObjectType,
  GraphQLType,
  isScalarType,
  isObjectType,
  isInterfaceType,
  isUnionType,
  isEnumType,
  isInputObjectType,
  isListType,
  isNonNullType,
} from 'graphql'
import { map, zip, keys, values, zipObj } from 'rambda'

export interface ObjectTypeIR {
  kind: 'object'
  fields?: Record<string, unknown>
  interfaces?: unknown
}
export function transformObjectType(T: GraphQLObjectType): ObjectTypeIR {
  const fields = T.getFields()

  const fieldsIR = zipObj(
    keys(fields) as string[],
    values(fields)
      .map((field) => field.type)
      .map(identifyType)
  )
  return {
    kind: 'object',
    // fields: fieldsIR,
  }
}

function identifyType(T: GraphQLType): string {
  if (isScalarType(T)) return 'Scalar'
  if (isObjectType(T)) return 'Object'
  if (isInterfaceType(T)) return 'Interface'
  if (isUnionType(T)) return 'Union'
  if (isEnumType(T)) return 'Enum'
  if (isInputObjectType(T)) return 'InputIbject'
  if (isListType(T)) return 'List'
  if (isNonNullType(T)) return 'NonNull'
}
