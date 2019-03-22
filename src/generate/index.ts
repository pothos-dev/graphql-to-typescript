import ts from 'typescript'
import { SchemaIR } from '../transform/SchemaIR'
import { DocumentIR } from '../transform/DocumentIR'
import { OperationIR } from '../transform/OperationIR'

export function generate(schema: SchemaIR, documentIR: DocumentIR): string {
  const sourceFile = ts.createSourceFile('', '', ts.ScriptTarget.Latest)
  const printer = ts.createPrinter()
  function print(t: any) {
    return printer.printNode(ts.EmitHint.Unspecified, t, sourceFile)
  }

  printer.printBundle

  return documentIR.operations
    .map(generateOperation)
    .map(print)
    .join('\n')
}

function generateOperation(operation: OperationIR): ts.VariableStatement {
  const name = ts.createIdentifier(operation.name)
  const initializer = ts.createTaggedTemplate(
    ts.createIdentifier('gql'),
    ts.createNoSubstitutionTemplateLiteral('__gql__')
  )

  return ts.createVariableStatement(
    undefined,
    ts.createVariableDeclarationList(
      [ts.createVariableDeclaration(name, undefined, initializer)],
      ts.NodeFlags.Const
    )
  )
}
