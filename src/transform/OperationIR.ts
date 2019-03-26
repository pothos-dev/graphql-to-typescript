import { OperationDefinitionNode } from 'graphql'
import { SelectionSetIR, transformSelectionSet } from './SelectionIR'
import { fromPairs } from 'lodash'
import { transformVariable, VariableIR } from './VariableIR'

export interface OperationIR {
  kind: 'query' | 'mutation' | 'subscription'
  name: string
  data: SelectionSetIR
  variables: Record<string, VariableIR>
  sourceCodeRange: [number, number]
}

export function transformOperation(T: OperationDefinitionNode): OperationIR {
  if (T.name == null) {
    throw 'expected operation to have a name'
  }
  if (T.loc == null) {
    throw 'expected operation to have a loc'
  }

  return {
    kind: T.operation,
    name: T.name.value,
    data: transformSelectionSet(T.selectionSet),
    variables: fromPairs((T.variableDefinitions || []).map(transformVariable)),
    sourceCodeRange: [T.loc.start, T.loc.end],
  }
}
