import ts from 'typescript'

export function generateHelperTypes() {
  return [
    generateOperationType('query'),
    generateOperationType('mutation'),
    generateOperationType('subscription'),
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
