import ts from 'typescript'
import { OperationIR } from '../transform/OperationIR'
import { SchemaIR } from '../transform/SchemaIR'
import { SelectionIR } from '../transform/SelectionIR'
import { TypeIR } from '../transform/TypeIR'
import { ObjectTypeIR } from '../transform/ObjectTypeIR'

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
              generateDataType(operation, getSchemaType(), schema),
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

  function getSchemaType(): TypeIR {
    if (operation.kind == 'query') return schema.types['Query']
    if (operation.kind == 'mutation') return schema.types['Mutation']
    if (operation.kind == 'subscription') return schema.types['Subscription']
  }
}

function generateDataType(
  operation: OperationIR,
  schemaType: TypeIR,
  schema: SchemaIR
) {
  return ts.createTypeLiteralNode(
    operation.data.map((selection) =>
      generateProperty(selection, schemaType, schema)
    )
  )
}
function generateProperty(
  selection: SelectionIR,
  schemaType: TypeIR,
  schema: SchemaIR
) {
  return ts.createPropertySignature(
    undefined,
    ts.createIdentifier(selection.name),
    undefined,
    generateType(selection.selections, schemaType, schema),
    undefined
  )
}

function generateType(
  selections: SelectionIR[] | undefined,
  schemaType: TypeIR,
  schema: SchemaIR
) {
  switch (schemaType.kind) {
    case 'enum':
      break
    case 'inputObject':
      break
    case 'interface':
      break
    case 'object':
      return generateObjectType(selections || [], schemaType, schema)
    case 'scalar':
      break
    case 'union':
      break
  }

  return ts.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword)
}

function generateObjectType(
  selections: SelectionIR[],
  schemaType: ObjectTypeIR,
  schema: SchemaIR
) {
  return ts.createTypeLiteralNode(
    selections.map((selection) =>
      generateProperty(selection, schemaType, schema)
    )
  )
}
