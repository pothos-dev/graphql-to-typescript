import ts from 'typescript'
import { SchemaIR } from '../transform/SchemaIR'
import { DocumentIR } from '../transform/DocumentIR'
import { OperationIR } from '../transform/OperationIR'
import { generateOperation } from './Operation'
import prettier from 'prettier'
import { generateImport } from './Import'
import { generateHelperTypes } from './HelperTypes'
import { generateScalarTypeAlias } from './ScalarType'
import { ScalarTypeIR } from '../transform/ScalarTypeIR'
import { InputObjectTypeIR } from '../transform/InputObjectTypeIR'
import { generateInputObjectType } from './InputObjectType'
import { isIP } from 'net'

export async function generateCode(
  schema: SchemaIR,
  document: DocumentIR,
  sourceCode: string
): Promise<string> {
  const sourceFile = ts.createSourceFile('', '', ts.ScriptTarget.Latest)
  const printer = ts.createPrinter()
  function print(t: any) {
    return printer.printNode(ts.EmitHint.Unspecified, t, sourceFile)
  }

  const nodes = [
    generateImport('graphql-tag', 'gql'),
    ...Object.values(schema.types)
      .filter((it) => it && it.kind == 'scalar')
      .map((it) => it as ScalarTypeIR)
      .map((it) => generateScalarTypeAlias(it)),
    ...Object.entries(schema.types)
      .map(([typename, type]) => ({ typename, type }))
      .filter((it) => it.type && it.type.kind == 'inputObject')
      .map((it) =>
        generateInputObjectType(
          schema,
          it.type as InputObjectTypeIR,
          it.typename
        )
      ),
    ...document.operations.map((op) =>
      generateOperation(op, schema, sourceCode)
    ),
    ...generateHelperTypes(),
  ]

  const code = nodes.map(print).join('\n')
  return await cleanup(code)
}

async function cleanup(code: string) {
  const prettierConfig = await prettier.resolveConfig(process.cwd())
  return prettier.format(code, {
    ...prettierConfig,
    parser: 'typescript',
  })
}
