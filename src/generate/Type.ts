import ts from 'typescript'
import { SchemaIR } from '../transform/SchemaIR'
import { TypeIR } from '../transform/TypeIR'
import { generateScalarType } from './ScalarType'
import { generateObjectType } from './ObjectType'
import { generateListType } from './ListType'
import { SelectionSetIR } from '../transform/SelectionIR'
import { UnionTypeIR } from '../transform/UnionTypeIR'

export function generateType(
  schema: SchemaIR,
  schemaType: TypeIR,
  selectionSet?: SelectionSetIR,
  typename?: string
) {
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
) {
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

export function generateUnionType(
  schema: SchemaIR,
  schemaType: UnionTypeIR,
  selectionSet: SelectionSetIR
) {
  return ts.createUnionTypeNode(
    schemaType.types.map((it) => {
      if (it.kind != 'namedType') {
        throw 'Expected union element to be NamedTypeIR, but is ' + it.kind
      }
      const elementTypename = it.typename
      const elementType = schema.types[elementTypename]
      if (elementType.kind !== 'object') {
        throw 'Expected Union element to be ObjectTypeIR, but is ' +
          elementType.kind
      }

      const elementSelectionSet = selectionSet.unions[elementTypename]
      return generateObjectType(
        schema,
        elementType,
        elementSelectionSet,
        elementTypename
      )
    })
  )
}
