import { GraphQLUnionType } from 'graphql'
import { TypeIR, transformType } from './TypeIR'
import { transformNamedType } from './NamedTypeIR'

export interface UnionTypeIR {
  kind: 'union'
  types: TypeIR[]
}
export function transformUnionType(T: GraphQLUnionType): UnionTypeIR {
  return {
    kind: 'union',
    types: T.getTypes().map(transformNamedType),
  }
}
