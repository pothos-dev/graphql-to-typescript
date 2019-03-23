import ts from 'typescript'
import { OperationIR } from '../transform/OperationIR'

export function generateOperation(
  operation: OperationIR,
  sourceCode: string
): ts.VariableStatement {
  return ts.createVariableStatement(
    undefined,
    ts.createVariableDeclarationList(
      [
        ts.createVariableDeclaration(
          ts.createIdentifier(operation.name),
          ts.createTypeReferenceNode(
            ts.createIdentifier(`__typed_${operation.kind}`),
            [
              ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
              ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
            ]
          ),
          ts.createTaggedTemplate(
            ts.createIdentifier('gql'),
            ts.createNoSubstitutionTemplateLiteral(formatGqlSource())
          )
        ),
      ],
      ts.NodeFlags.Const
    )
  )

  function formatGqlSource() {
    return sourceCode
      .substring(operation.sourceCodeRange[0], operation.sourceCodeRange[1])
      .replace(/\n/g, ' ')
  }
}
