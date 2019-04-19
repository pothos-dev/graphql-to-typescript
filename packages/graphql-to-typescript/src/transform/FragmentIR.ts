import { FragmentDefinitionNode } from 'graphql'
import { SelectionSetIR, transformSelectionSet } from './SelectionIR'

export interface FragmentIR {
  name: string
  schemaObjectName: string
  selectionSet: SelectionSetIR
  sourceCodeRange: [number, number]
}
export function transformFragment(T: FragmentDefinitionNode): FragmentIR {
  if (T.loc == null) {
    throw Error('expected fragment to have a loc')
  }

  return {
    name: T.name.value,
    schemaObjectName: T.typeCondition.name.value,
    selectionSet: transformSelectionSet(T.selectionSet),
    sourceCodeRange: [T.loc.start, T.loc.end],
  }
}
