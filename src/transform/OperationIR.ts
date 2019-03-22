import { OperationDefinitionNode } from 'graphql'
import { SelectionIR, transformSelection } from './SelectionIR'

export interface OperationIR {
  kind: 'query' | 'mutation' | 'subscription'
  name: string
  data: SelectionIR[]
}

export function transformOperation(T: OperationDefinitionNode) {
  return {
    kind: T.operation,
    name: T.name.value,
    data: T.selectionSet.selections.map(transformSelection),
  }
}
