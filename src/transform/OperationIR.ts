import { OperationDefinitionNode } from 'graphql'
import { ObjectTypeIR } from './ObjectTypeIR'
import { SelectionSetIR, transformSelectionSet } from './SelectionIR'

export interface OperationIR {
  kind: 'query' | 'mutation' | 'subscription'
  name: string
  data: SelectionSetIR
  variables: ObjectTypeIR
  sourceCodeRange: [number, number]
}

export function transformOperation(T: OperationDefinitionNode): OperationIR {
  return {
    kind: T.operation,
    name: T.name.value,
    data: transformSelectionSet(T.selectionSet),
    variables: transformVariables(T),
    sourceCodeRange: [T.loc.start, T.loc.end],
  }
}

function transformVariables(T: OperationDefinitionNode): ObjectTypeIR {
  // TODO
  return {
    kind: 'object',
    fields: {},
  }
}
