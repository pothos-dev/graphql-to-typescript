import { OperationDefinitionNode } from 'graphql'
import { SelectionIR, transformSelection } from './SelectionIR'
import { ObjectTypeIR } from './ObjectTypeIR'
import { NonNullTypeIR } from './NonNullTypeIR'

export interface OperationIR {
  kind: 'query' | 'mutation' | 'subscription'
  name: string
  data: SelectionIR[]
  variables: ObjectTypeIR
  sourceCodeRange: [number, number]
}

export function transformOperation(T: OperationDefinitionNode): OperationIR {
  return {
    kind: T.operation,
    name: T.name.value,
    data: T.selectionSet.selections.map(transformSelection),
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
