import ts from 'typescript'
import { SchemaIR } from '../transform/SchemaIR'
import { SelectionIR } from '../transform/SelectionIR'
import { ObjectTypeIR } from '../transform/ObjectTypeIR'
import { generateType } from './Type'

export function generateObjectType(
  selections: SelectionIR[],
  schemaType: ObjectTypeIR,
  schema: SchemaIR
) {
  return ts.createTypeLiteralNode(selections.map(generateProperty))
  function generateProperty(selection: SelectionIR) {
    const fieldType = schemaType.fields[selection.schemaName]
    return ts.createPropertySignature(
      undefined,
      ts.createIdentifier(selection.name),
      undefined,
      generateType(selection.selections, fieldType, schema),
      undefined
    )
  }
}
