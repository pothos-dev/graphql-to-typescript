import { OperationDefinitionNode } from 'graphql'
import { SelectionIR, transformSelection } from './SelectionIR'

export interface OperationIR {
  kind: 'query' | 'mutation' | 'subscription'
  name: string
  data: SelectionIR[]
  sourceCodeRange: [number, number]
}

export function transformOperation(T: OperationDefinitionNode): OperationIR {
  return {
    kind: T.operation,
    name: T.name.value,
    data: T.selectionSet.selections.map(transformSelection),
    sourceCodeRange: [T.loc.start, T.loc.end],
  }
}
