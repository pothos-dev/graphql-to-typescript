import { GraphQLNonNull } from 'graphql'
import { transformType, TypeIR } from './TypeIR'
import { VariableIR } from './VariableIR'

export interface NonNullTypeIR {
  kind: 'nonNull'
  wrappedType: TypeIR
}

export interface NonNullVariableIR {
  kind: 'nonNull'
  wrappedType: VariableIR
}

export function transformNonNull(T: GraphQLNonNull<any>): NonNullTypeIR {
  return {
    kind: 'nonNull',
    wrappedType: transformType(T.ofType),
  }
}
