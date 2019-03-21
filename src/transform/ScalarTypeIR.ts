import { GraphQLScalarType } from 'graphql'

export interface ScalarTypeIR {
  kind: 'scalar'
  scalar: string
}
export function transformScalarType(T: GraphQLScalarType): ScalarTypeIR {
  return {
    kind: 'scalar',
    scalar: T.name,
  }
}
