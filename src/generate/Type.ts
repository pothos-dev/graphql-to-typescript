import ts from 'typescript'
import { SchemaIR } from '../transform/SchemaIR'
import { SelectionIR } from '../transform/SelectionIR'
import { TypeIR } from '../transform/TypeIR'
import { generateScalarType } from './ScalarType'
import { generateObjectType } from './ObjectType'

export function generateType(
  schema: SchemaIR,
  schemaType: TypeIR,
  selections?: SelectionIR[]
) {
  if (schemaType.kind == 'nonNull') {
    return generateNonNullType(schema, schemaType.wrappedType, selections)
  }

  return ts.createTypeReferenceNode(ts.createIdentifier('Nullable'), [
    generateNonNullType(schema, schemaType, selections),
  ])
}

export function generateNonNullType(
  schema: SchemaIR,
  schemaType: TypeIR,
  selections?: SelectionIR[]
) {
  switch (schemaType.kind) {
    case 'namedType':
      return generateType(schema, schema.types[schemaType.typename], selections)
    case 'enum':
      break
    case 'inputObject':
      break
    case 'interface':
      break
    case 'object':
      return generateObjectType(schema, schemaType, selections || [])
    case 'scalar':
      return generateScalarType(schema, schemaType)
    case 'union':
      break
    case 'list':
      break
  }

  console.log('Unhandled type in generateNonNullType: ' + schemaType.kind)

  return ts.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword)
}
