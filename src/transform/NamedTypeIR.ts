import { GraphQLNamedType } from 'graphql'
import { TypeIR, transformType } from './TypeIR'

export type NamedTypeIR = TypeIR & {
  typename: string
}
export function transformNamedType(T: GraphQLNamedType): NamedTypeIR {
  const typename = T.name
  if (typename.startsWith('__')) return

  const type = transformType(T)
  return { ...type, typename }
}
