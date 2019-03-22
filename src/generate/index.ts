import ts from 'typescript'
import { SchemaIR } from '../transform/SchemaIR'

export function generate(schema: SchemaIR): string {
  let sourceFile = ts.createSourceFile('result.ts', '', ts.ScriptTarget.Latest)

  sourceFile = ts.updateSourceFileNode(sourceFile, [
    ts.createTypeAliasDeclaration(
      undefined,
      undefined,
      ts.createIdentifier('Query'),
      undefined,
      ts.createTypeLiteralNode([])
    ),
  ])

  const printer = ts.createPrinter()
  return printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile)
}
