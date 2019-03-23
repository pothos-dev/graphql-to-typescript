import ts from 'typescript'
import { OperationIR } from '../transform/OperationIR'

export function generateOperation(
  operation: OperationIR,
  sourceCode: string
): ts.VariableStatement {
  const name = ts.createIdentifier(operation.name)

  let gqlSourceCode = sourceCode.substring(
    operation.sourceCodeRange[0],
    operation.sourceCodeRange[1]
  )
  gqlSourceCode = gqlSourceCode.replace(/\n/g, ' ')

  const initializer = ts.createTaggedTemplate(
    ts.createIdentifier('gql'),
    ts.createNoSubstitutionTemplateLiteral(gqlSourceCode)
  )

  return ts.createVariableStatement(
    undefined,
    ts.createVariableDeclarationList(
      [ts.createVariableDeclaration(name, undefined, initializer)],
      ts.NodeFlags.Const
    )
  )
}
