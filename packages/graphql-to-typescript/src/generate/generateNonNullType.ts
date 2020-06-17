import ts from 'typescript'
import { SchemaIR } from '../transform/SchemaIR'
import { TypeIR } from '../transform/TypeIR'
import { generateScalarType } from './ScalarType'
import { generateObjectType } from './ObjectType'
import { generateListType } from './ListType'
import { SelectionSetIR } from '../transform/SelectionIR'
import { generateUnionType } from './UnionType'
import { generateInputObjectTypeAsNamedType } from './InputObjectType'
import { generateEnumType } from './EnumType'

export function generateNonNullType(
  schema: SchemaIR,
  schemaType: TypeIR,
  selectionSet?: SelectionSetIR,
  typename?: string
): ts.TypeNode {
  if (schemaType == null) {
    console.log({ schemaType, typename, selectionSet })
  }
  switch (schemaType.kind) {
    case 'namedType':
      if (schema.types[schemaType.typename] == null) {
        return ts.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword)
      }
      return generateNonNullType(
        schema,
        schema.types[schemaType.typename],
        selectionSet,
        schemaType.typename
      )
    case 'enum':
      return generateEnumType(typename!)
    case 'inputObject':
      return generateInputObjectTypeAsNamedType(typename!)
    case 'interface':
      break
    case 'object':
      return generateObjectType(schema, schemaType, selectionSet)
    case 'scalar':
      return generateScalarType(schema, schemaType)
    case 'union':
      return generateUnionType(schema, schemaType, selectionSet)
    case 'list':
      return generateListType(schema, schemaType, selectionSet)
  }
  throw Error('Unhandled type in generateNonNullType: ' + schemaType.kind)
}
