import ts from 'typescript'
import { OperationIR } from '../transform/OperationIR'
import { SchemaIR } from '../transform/SchemaIR'
import { TypeIR } from '../transform/TypeIR'
import { generateNonNullType } from './Type'
import { toPairs } from 'lodash'
import { VariableIR } from '../transform/VariableIR'

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
          ts.createTypeReferenceNode(ts.createIdentifier('__typed_operation'), [
            ts.createLiteralTypeNode(ts.createLiteral(operation.kind)),
            generateVariables(),
            generateData(),
          ]),
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

  function generateVariables(): ts.TypeLiteralNode {
    return ts.createTypeLiteralNode(
      toPairs(operation.variables || {}).map(([name, variable]) =>
        ts.createPropertySignature(
          undefined,
          ts.createIdentifier(name),
          undefined,
          generateVariableType(variable),
          undefined
        )
      )
    )

    function generateVariableType(
      variable: VariableIR,
      nullable?: boolean
    ): ts.TypeNode {
      if (variable.kind == 'nonNull') {
        return generateVariableType(variable.wrappedType, false)
      }

      if (nullable == null || nullable == true) {
        return ts.createTypeReferenceNode(ts.createIdentifier('Nullable'), [
          generateVariableType(variable, false),
        ])
      }

      if (variable.kind == 'list') {
        return ts.createTypeReferenceNode(
          ts.createIdentifier('ReadonlyArray'),
          [generateVariableType(variable.wrappedType)]
        )
      }

      return ts.createTypeReferenceNode(
        ts.createIdentifier(variable.typename),
        undefined
      )
    }
  }

  function generateData() {
    return generateNonNullType(schema, getSchemaType(), operation.data)

    function getSchemaType(): TypeIR {
      if (operation.kind == 'query') return schema.types['Query']
      if (operation.kind == 'mutation') return schema.types['Mutation']
      if (operation.kind == 'subscription') return schema.types['Subscription']
      throw 'unexpected operation.kind ' + operation.kind
    }
  }
}
