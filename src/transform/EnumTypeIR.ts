import { GraphQLEnumType } from 'graphql'

export interface EnumTypeIR {
  kind: 'enum'
}
export function transformEnumType(T: GraphQLEnumType): EnumTypeIR {
  return { kind: 'enum' }
}
