import ts from 'typescript'
import { SchemaIR } from '../transform/SchemaIR'
import { SelectionIR } from '../transform/SelectionIR'
import { ObjectTypeIR } from '../transform/ObjectTypeIR'
import { generateType } from './Type'

export function generateObjectType(
  schema: SchemaIR,
  schemaType: ObjectTypeIR,
  selections: SelectionIR[]
) {
  return ts.createTypeLiteralNode(selections.map(generateProperty))
  function generateProperty(selection: SelectionIR) {
    let fieldType = schemaType.fields[selection.schemaName]
    while (fieldType.kind == 'namedType') {
      fieldType = schema.types[fieldType.typename]
    }

    return ts.createPropertySignature(
      undefined,
      ts.createIdentifier(selection.name),
      undefined,
      generateType(schema, fieldType, selection.selections),
      undefined
    )
  }
}
