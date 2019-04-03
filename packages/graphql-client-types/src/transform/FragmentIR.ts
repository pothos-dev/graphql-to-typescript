import { FragmentDefinitionNode } from 'graphql'
import { SelectionSetIR, transformSelectionSet } from './SelectionIR'

export interface FragmentIR {
  name: string
  schemaObjectName: string
  selectionSet: SelectionSetIR
}
export function transformFragment(T: FragmentDefinitionNode): FragmentIR {
  return {
    name: T.name.value,
    schemaObjectName: T.typeCondition.name.value,
    selectionSet: transformSelectionSet(T.selectionSet),
  }
}
