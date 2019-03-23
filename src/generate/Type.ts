import ts from 'typescript'
import { SchemaIR } from '../transform/SchemaIR'
import { SelectionIR } from '../transform/SelectionIR'
import { TypeIR } from '../transform/TypeIR'
import { generateScalarType } from './ScalarType'
import { generateObjectType } from './ObjectType'

export function generateType(
  selections: SelectionIR[] | undefined,
  schemaType: TypeIR,
  schema: SchemaIR
) {
  switch (schemaType.kind) {
    case 'namedType':
      return generateType(selections, schema.types[schemaType.typename], schema)
    case 'enum':
      break
    case 'inputObject':
      break
    case 'interface':
      break
    case 'object':
      return generateObjectType(selections || [], schemaType, schema)
    case 'scalar':
      return generateScalarType(schemaType, schema)
    case 'union':
      break
  }
  return ts.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword)
}
