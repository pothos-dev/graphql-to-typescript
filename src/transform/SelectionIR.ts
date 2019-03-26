import {
  SelectionNode,
  FieldNode,
  FragmentSpreadNode,
  InlineFragmentNode,
  SelectionSetNode,
} from 'graphql'

export interface SelectionSetIR {
  fields: FieldSelectionIR[]
  unions: Record<string /* typename*/, SelectionSetIR>
  fragments: string[]
}

export interface FieldSelectionIR {
  name: string
  schemaName: string
  selectionSet?: SelectionSetIR
}

export function transformSelectionSet(T: SelectionSetNode): SelectionSetIR {
  const fields = T.selections
    .filter((it) => it.kind == 'Field')
    .map(transformField)

  const unions = {}
  for (const [typename, selectionSetIR] of T.selections
    .filter((it) => it.kind == 'InlineFragment')
    .map(transformInlineFragment)) {
    unions[typename] = selectionSetIR
  }

  const fragments = T.selections
    .filter((it) => it.kind == 'FragmentSpread')
    .map(transformFragmentSpread)

  return { fields, unions, fragments }
}

function transformField(T: FieldNode): FieldSelectionIR {
  return {
    name: (T.alias || T.name).value,
    schemaName: T.name.value,
    selectionSet: T.selectionSet && transformSelectionSet(T.selectionSet),
  }
}

function transformFragmentSpread(T: FragmentSpreadNode): string {
  return T.name.value
}

function transformInlineFragment(
  T: InlineFragmentNode
): [string, SelectionSetIR] {
  return [T.typeCondition.name.value, transformSelectionSet(T.selectionSet)]
}
