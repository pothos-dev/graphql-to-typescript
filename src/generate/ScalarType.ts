import ts from 'typescript'
import { SchemaIR } from '../transform/SchemaIR'
import { ScalarTypeIR } from '../transform/ScalarTypeIR'

export function generateScalarType(schemaType: ScalarTypeIR, schema: SchemaIR) {
  switch (schemaType.scalar) {
    case 'String':
      return ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
    case 'Int':
    case 'Float':
      return ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
    case 'Boolean':
      return ts.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword)
    case 'ID':
      return ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword) // TODO custom ID type
  }
  // TODO custom scalar type
  return ts.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword)
}
