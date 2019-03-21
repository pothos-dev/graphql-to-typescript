import { GraphQLNamedType } from 'graphql'
import { TypeIR, transformType } from './TypeIR'

export type NamedTypeIR = { typename: string } & TypeIR
export function transformNamedType(T: GraphQLNamedType): NamedTypeIR {
  const typename = T.name
  const type = transformType(T)
  return { ...type, typename }
}
