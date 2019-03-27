import { GraphQLNamedType } from 'graphql'

export interface NamedTypeIR {
  kind: 'namedType'
  typename: string
}

export interface NamedVariableIR {
  kind: 'namedType'
  typename: string
}

export function transformNamedType(T: GraphQLNamedType): NamedTypeIR {
  const typename = T.name
  return { kind: 'namedType', typename }
}
