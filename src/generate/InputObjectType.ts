import ts, { createTypeLiteralNode } from 'typescript'
import { InputObjectTypeIR } from '../transform/InputObjectTypeIR'
import { toPairs } from 'lodash'
import { generateType } from './Type'
import { SchemaIR } from '../transform/SchemaIR'
import { TypeIR } from '../transform/TypeIR'

export function generateInputObjectTypeAsInterface(
  schema: SchemaIR,
  inputObjectType: InputObjectTypeIR,
  typename: string
): ts.InterfaceDeclaration {
  return ts.createInterfaceDeclaration(
    undefined,
    [ts.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.createIdentifier(typename),
    undefined,
    undefined,
    toPairs(inputObjectType.fields).map(([typename, type]) =>
      ts.createPropertySignature(
        undefined,
        ts.createIdentifier(typename),
        undefined,
        generateType(schema, type, undefined, typename),
        undefined
      )
    )
  )
}

export function generateInputObjectTypeAsNamedType(
  typename: string
): ts.TypeNode {
  return ts.createTypeReferenceNode(ts.createIdentifier(typename!), undefined)
}
