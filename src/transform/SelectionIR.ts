import {
  SelectionNode,
  FieldNode,
  FragmentSpreadNode,
  InlineFragmentNode,
} from 'graphql'

export interface SelectionIR {
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
  throw { message: 'not yet implemented' }
}

function transformInlineFragment(T: InlineFragmentNode): SelectionIR {
  throw { message: 'not yet implemented' }
}
