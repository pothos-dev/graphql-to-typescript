import ts from 'typescript'

export function generateHelperTypes() {
  return [generateOperationType(), createNullableType()]
}

function generateOperationType() {
  return ts.createTypeAliasDeclaration(
    undefined,
    undefined,
    ts.createIdentifier(`__operation`),
    [
      ts.createTypeParameterDeclaration(
        ts.createIdentifier('Kind'),
        undefined,
        undefined
      ),
      ts.createTypeParameterDeclaration(
        ts.createIdentifier('Data'),
        undefined,
        undefined
      ),
      ts.createTypeParameterDeclaration(
        ts.createIdentifier('Variables'),
        undefined,
        undefined
      ),
    ],
    ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
  )
}

function createNullableType() {
  return ts.createTypeAliasDeclaration(
    undefined,
    undefined,
    ts.createIdentifier('Nullable'),
    [
      ts.createTypeParameterDeclaration(
        ts.createIdentifier('T'),
        undefined,
        undefined
      ),
    ],
    ts.createUnionTypeNode([
      ts.createTypeReferenceNode(ts.createIdentifier('T'), undefined),
      ts.createNull(),
    ])
  )
}
