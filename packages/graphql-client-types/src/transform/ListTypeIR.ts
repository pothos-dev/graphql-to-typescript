import { TypeIR, transformType } from './TypeIR'
import { GraphQLList, GraphQLType } from 'graphql'
import { VariableIR } from './VariableIR'

export interface ListTypeIR {
  kind: 'list'
  wrappedType: TypeIR
}

export interface ListVariableIR {
  kind: 'list'
  wrappedType: VariableIR
}

export function transformListType<TType extends GraphQLType>(
  T: GraphQLList<TType>
): ListTypeIR {
  return {
    kind: 'list',
    wrappedType: transformType(T.ofType),
  }
}
