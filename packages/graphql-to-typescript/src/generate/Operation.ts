import ts from 'typescript'
import { OperationIR } from '../transform/OperationIR'
import { SchemaIR } from '../transform/SchemaIR'
import { TypeIR } from '../transform/TypeIR'
import { generateNonNullType } from './generateNonNullType'
import { toPairs } from 'lodash'
import { VariableIR } from '../transform/VariableIR'
import { DocumentIR } from '../transform/DocumentIR'

export function generateOperations(
  schema: SchemaIR,
  document: DocumentIR,
  sourceCode: string
) {
  return ts.createExportAssignment(
    undefined,
    undefined,
    undefined,
    ts.createObjectLiteral(
      document.operations.map((operation) =>
        ts.createPropertyAssignment(
          ts.createIdentifier(operation.name),
          ts.createAsExpression(
            ts.createNoSubstitutionTemplateLiteral(
              formatGqlSource(document, sourceCode, operation)
            ),
            ts.createTypeReferenceNode(ts.createIdentifier('Operation'), [
              ts.createLiteralTypeNode(ts.createLiteral(operation.kind)),
              generateVariables(operation),
              generateData(schema, operation),
            ])
          )
        )
      )
    )
  )
}

function formatGqlSource(
  document: DocumentIR,
  sourceCode: string,
  operation: OperationIR
): string {
  let gqlSource = sourceCode.substring(
    operation.sourceCodeRange[0],
    operation.sourceCodeRange[1]
  )

  document.fragments
    .filter((fragment) => operation.fragmentNames.includes(fragment.name))
    .forEach(
      (fragment) =>
        (gqlSource +=
          '\n' +
          sourceCode.substring(
            fragment.sourceCodeRange[0],
            fragment.sourceCodeRange[1]
          ))
    )

  return gqlSource
}

function generateVariables(operation: OperationIR): ts.TypeLiteralNode {
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
      return ts.createUnionTypeNode([
        ts.createKeywordTypeNode(ts.SyntaxKind.NullKeyword),
        generateVariableType(variable, false),
      ])
    }

    if (variable.kind == 'list') {
      return ts.createTypeReferenceNode(ts.createIdentifier('ReadonlyArray'), [
        generateVariableType(variable.wrappedType),
      ])
    }

    return ts.createTypeReferenceNode(
      ts.createIdentifier(variable.typename),
      undefined
    )
  }
}

function generateData(schema: SchemaIR, operation: OperationIR) {
  const schemaType = getSchemaType()
  if (schemaType == null) {
    console.log(operation.name)
    console.log(Object.keys(schema.types))
    process.exit(0)
  }
  return generateNonNullType(schema, schemaType, operation.data)

  function getSchemaType(): TypeIR {
    if (operation.kind == 'query') return schema.types[schema.queryTypeName!]
    if (operation.kind == 'mutation')
      return schema.types[schema.mutationTypeName!]
    if (operation.kind == 'subscription')
      return schema.types[schema.subscriptionTypeName!]
    throw Error('unexpected operation.kind ' + operation.kind)
  }
}
