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
  fragmentNames: string[]
}

export function transformOperation(T: OperationDefinitionNode): OperationIR {
  if (T.name == null) {
    throw Error('expected operation to have a name')
  }
  if (T.loc == null) {
    throw Error('expected operation to have a loc')
  }

  const data = transformSelectionSet(T.selectionSet)

  return {
    kind: T.operation,
    name: T.name.value,
    data,
    variables: fromPairs((T.variableDefinitions || []).map(transformVariable)),
    sourceCodeRange: [T.loc.start, T.loc.end],
    fragmentNames: getFragmentsFromSelectionSet(data),
  }
}

function getFragmentsFromSelectionSet(selectionSet: SelectionSetIR): string[] {
  return [
    ...selectionSet.fragments,
    ...selectionSet.fields
      .map((field) => {
        if (!field.selectionSet) return []
        return getFragmentsFromSelectionSet(field.selectionSet)
      })
      .reduce((a, b) => [...a, ...b], []),
    ...Object.values(selectionSet.unions)
      .map(getFragmentsFromSelectionSet)
      .reduce((a, b) => [...a, ...b], []),
  ]
}
