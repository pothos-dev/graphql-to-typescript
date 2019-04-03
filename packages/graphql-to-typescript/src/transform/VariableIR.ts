import { NamedVariableIR } from './NamedTypeIR'
import { NonNullVariableIR } from './NonNullTypeIR'
import { ListVariableIR } from './ListTypeIR'
import { VariableDefinitionNode, TypeNode } from 'graphql'

export type VariableIR = NamedVariableIR | NonNullVariableIR | ListVariableIR

export function transformVariable(
  T: VariableDefinitionNode
): [string, VariableIR] {
  return [T.variable.name.value, transformTypeNode(T.type)]

  function transformTypeNode(T: TypeNode): VariableIR {
    if (T.kind == 'NonNullType') {
      return { kind: 'nonNull', wrappedType: transformTypeNode(T.type) }
    }
    if (T.kind == 'NamedType') {
      return { kind: 'namedType', typename: T.name.value }
    }
    if (T.kind == 'ListType') {
      return { kind: 'list', wrappedType: transformTypeNode(T.type) }
    }
    throw 'Unexpected TypeNode.kind in transformTypeNode'
  }
}
