import { GraphQLNonNull } from 'graphql'
import { transformType, TypeIR } from './TypeIR'

export interface NonNullTypeIR {
  kind: 'nonNull'
  wrappedType: TypeIR
}

export function transformNonNull(T: GraphQLNonNull<any>): NonNullTypeIR {
  return {
    kind: 'nonNull',
    wrappedType: transformType(T.ofType),
  }
}
