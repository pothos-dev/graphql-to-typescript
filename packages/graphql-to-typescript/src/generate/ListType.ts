import ts from 'typescript'
import { SchemaIR } from '../transform/SchemaIR'
import { generateType } from './Type'
import { ListTypeIR } from '../transform/ListTypeIR'
import { SelectionSetIR } from '../transform/SelectionIR'

export function generateListType(
  schema: SchemaIR,
  schemaType: ListTypeIR,
  selectionSet?: SelectionSetIR
) {
  return ts.createTypeReferenceNode(ts.createIdentifier('ReadonlyArray'), [
    generateType(schema, schemaType.wrappedType, selectionSet),
  ])
}
