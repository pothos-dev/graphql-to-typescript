import {
  OperationDefinitionNode,
  SelectionNode,
  FragmentSpreadNode,
  InlineFragmentNode,
  FieldNode,
  SelectionSetNode,
} from 'graphql'
import { ObjectTypeIR } from './ObjectTypeIR'
import { NamedTypeIR } from './NamedTypeIR'
import { TypeIR } from './TypeIR'

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

interface SelectionIR {
  name: string
  schemaName: string
  selections?: SelectionIR[]
}

export function transformSelection(T: SelectionNode): SelectionIR {
  switch (T.kind) {
    case 'Field':
      return transformField(T)
    case 'FragmentSpread':
      return transformFragmentSpread(T)
    case 'InlineFragment':
      return transformInlineFragment(T)
  }
}

function transformField(T: FieldNode): SelectionIR {
  return {
    name: (T.alias || T.name).value,
    schemaName: T.name.value,
    selections:
      T.selectionSet && T.selectionSet.selections.map(transformSelection),
  }
}

function transformFragmentSpread(T: FragmentSpreadNode): SelectionIR {
  throw 'not yet implemented'
}

function transformInlineFragment(T: InlineFragmentNode): SelectionIR {
  throw 'not yet implemented'
}
