import ts from 'typescript'

export function generateHelperTypes() {
  return [
    generateOperationType('query'),
    generateOperationType('mutation'),
    generateOperationType('subscription'),
    createNullableType(),
  ]
}

function generateOperationType(operationName: string) {
  return ts.createTypeAliasDeclaration(
    undefined,
    undefined,
    ts.createIdentifier(`__typed_${operationName}`),
    [
      ts.createTypeParameterDeclaration(
        ts.createIdentifier('D'),
        undefined,
        undefined
      ),
      ts.createTypeParameterDeclaration(
        ts.createIdentifier('V'),
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
