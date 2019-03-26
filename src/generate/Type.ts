import ts from 'typescript'
import { SchemaIR } from '../transform/SchemaIR'
import { TypeIR } from '../transform/TypeIR'
import { generateScalarType } from './ScalarType'
import { generateObjectType } from './ObjectType'
import { generateListType } from './ListType'
import { SelectionSetIR } from '../transform/SelectionIR'
import { generateUnionType } from './UnionType'

export function generateType(
  schema: SchemaIR,
  schemaType: TypeIR,
  selectionSet?: SelectionSetIR,
  typename?: string
): ts.TypeNode {
  if (schemaType.kind == 'nonNull') {
    return generateNonNullType(schema, schemaType.wrappedType, selectionSet)
  }

  return ts.createTypeReferenceNode(ts.createIdentifier('Nullable'), [
    generateNonNullType(schema, schemaType, selectionSet),
  ])
}

export function generateNonNullType(
  schema: SchemaIR,
  schemaType: TypeIR,
  selectionSet?: SelectionSetIR,
  typename?: string
): ts.TypeNode {
  switch (schemaType.kind) {
    case 'namedType':
      return generateType(
        schema,
        schema.types[schemaType.typename],
        selectionSet,
        schemaType.typename
      )
    case 'enum':
      break
    case 'inputObject':
      break
    case 'interface':
      break
    case 'object':
      return generateObjectType(schema, schemaType, selectionSet)
    case 'scalar':
      return generateScalarType(schema, schemaType)
    case 'union':
      return generateUnionType(schema, schemaType, selectionSet)
    case 'list':
      return generateListType(schema, schemaType)
  }

  throw 'Unhandled type in generateNonNullType: ' + schemaType.kind
}
