import { TypeIR, transformType } from './TypeIR'
import { GraphQLList, GraphQLType } from 'graphql'

export interface ListTypeIR {
  kind: 'list'
  wrappedType: TypeIR
}

export function transformListType<TType extends GraphQLType>(
  T: GraphQLList<TType>
): ListTypeIR {
  return {
    kind: 'list',
    wrappedType: transformType(T.ofType),
  }
}
