import { GraphQLEnumType, GraphQLEnumValue } from 'graphql'

export interface EnumTypeIR {
  kind: 'enum'
  values: string[]
}

export function transformEnumType(T: GraphQLEnumType): EnumTypeIR {
  return { kind: 'enum', values: T.getValues().map(enumTypeName) }
}

function enumTypeName(T: GraphQLEnumValue) {
  return T.name
}
