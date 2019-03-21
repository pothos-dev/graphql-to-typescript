import { GraphQLUnionType } from 'graphql'

export interface UnionTypeIR {
  kind: 'union'
}
export function transformUnionType(T: GraphQLUnionType): UnionTypeIR {
  return {
    kind: 'union',
  }
}
