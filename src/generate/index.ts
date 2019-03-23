import ts from 'typescript'
import { SchemaIR } from '../transform/SchemaIR'
import { DocumentIR } from '../transform/DocumentIR'
import { OperationIR } from '../transform/OperationIR'
import { generateOperation } from './Operation'
import prettier from 'prettier'

export async function generate(
  schema: SchemaIR,
  documentIR: DocumentIR,
  sourceCode: string
): Promise<string> {
  const sourceFile = ts.createSourceFile('', '', ts.ScriptTarget.Latest)
  const printer = ts.createPrinter()
  function print(t: any) {
    return printer.printNode(ts.EmitHint.Unspecified, t, sourceFile)
  }

  const outputFile = documentIR.operations
    .map((op) => generateOperation(op, sourceCode))
    .map(print)
    .join('\n')

  const prettierConfig = await prettier.resolveConfig(process.cwd())
  return prettier.format(outputFile, prettierConfig)
}
