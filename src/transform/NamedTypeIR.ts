import { GraphQLNamedType } from 'graphql'

export type NamedTypeIR = { kind: 'namedType'; typename: string }
export function transformNamedType(T: GraphQLNamedType): NamedTypeIR {
  const typename = T.name
  return { kind: 'namedType', typename }
}
