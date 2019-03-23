import ts from 'typescript'
import { OperationIR } from '../transform/OperationIR'
import { SchemaIR } from '../transform/SchemaIR'
import { TypeIR } from '../transform/TypeIR'
import { generateType } from './Type'

export function generateOperation(
  operation: OperationIR,
  schema: SchemaIR,
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
              generateOperationData(operation, schema),
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

  function formatGqlSource(): string {
    return sourceCode
      .substring(operation.sourceCodeRange[0], operation.sourceCodeRange[1])
      .replace(/\n/g, ' ')
  }
}

function generateOperationData(operation: OperationIR, schema: SchemaIR) {
  return generateType(operation.data, getSchemaType(), schema)

  function getSchemaType(): TypeIR {
    if (operation.kind == 'query') return schema.types['Query']
    if (operation.kind == 'mutation') return schema.types['Mutation']
    if (operation.kind == 'subscription') return schema.types['Subscription']
  }
}
