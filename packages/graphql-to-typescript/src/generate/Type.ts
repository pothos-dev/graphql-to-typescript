import ts from 'typescript'
import { SchemaIR } from '../transform/SchemaIR'
import { TypeIR } from '../transform/TypeIR'
import { SelectionSetIR } from '../transform/SelectionIR'
import { generateNonNullType } from './generateNonNullType'

export function generateType(
  schema: SchemaIR,
  schemaType: TypeIR,
  selectionSet?: SelectionSetIR,
  typename?: string
): ts.TypeNode {
  if (schemaType == null) {
    console.log({ schemaType, typename, selectionSet })
  }

  if (schemaType.kind == 'nonNull') {
    if (schemaType.wrappedType == null) {
      console.log({ place: 'generateType', schemaType, typename, selectionSet })
    }

    return generateNonNullType(schema, schemaType.wrappedType, selectionSet)
  }

  return ts.createUnionTypeNode([
    ts.createKeywordTypeNode(ts.SyntaxKind.NullKeyword),
    generateNonNullType(schema, schemaType, selectionSet, typename),
  ])
}
