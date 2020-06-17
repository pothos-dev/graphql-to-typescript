import ts from 'typescript'
import { EnumTypeIR } from '../transform/EnumTypeIR'

export function generateEnumType(typename: string) {
  return ts.createTypeReferenceNode(ts.createIdentifier(typename), undefined)
}

export function generateEnumTypeAlias(enumType: EnumTypeIR, typename: string) {
  enumType.values

  return ts.createTypeAliasDeclaration(
    undefined,
    [ts.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.createIdentifier(typename),
    undefined,
    ts.createUnionTypeNode(
      enumType.values.map((value) =>
        ts.createLiteralTypeNode(ts.createStringLiteral(value))
      )
    )
  )
}
