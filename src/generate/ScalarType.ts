import ts from 'typescript'
import { SchemaIR } from '../transform/SchemaIR'
import { ScalarTypeIR } from '../transform/ScalarTypeIR'

export function generateScalarType(schema: SchemaIR, schemaType: ScalarTypeIR) {
  return ts.createTypeReferenceNode(
    ts.createIdentifier(schemaType.scalar),
    undefined
  )
}

export function generateScalarTypeAlias(
  scalarType: ScalarTypeIR
): ts.TypeAliasDeclaration {
  return ts.createTypeAliasDeclaration(
    undefined,
    [ts.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.createIdentifier(scalarType.scalar),
    undefined,
    selectKeyword()
  )

  function selectKeyword() {
    switch (scalarType.scalar) {
      case 'Boolean':
        return ts.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword)
      case 'Int':
      case 'Float':
        return ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
      case 'String':
      case 'ID':
      default:
        return ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
    }
  }
}
