import { OperationDefinitionNode } from 'graphql'

export interface OperationIR {
  kind: 'query' | 'mutation' | 'subscription'
  name: string
}

export function transformOperation(T: OperationDefinitionNode) {
  return {
    kind: T.operation,
    name: T.name.value,
  }
}
