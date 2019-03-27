import ts from 'typescript'
import { InputObjectTypeIR } from '../transform/InputObjectTypeIR'
import { toPairs } from 'lodash'
import { generateType } from './Type'
import { SchemaIR } from '../transform/SchemaIR'
import { TypeIR } from '../transform/TypeIR'

export function generateInputObjectType(
  schema: SchemaIR,
  inputObjectType: InputObjectTypeIR,
  typename: string
) {
  return ts.createInterfaceDeclaration(
    undefined,
    undefined,
    ts.createIdentifier(typename),
    undefined,
    undefined,
    toPairs(inputObjectType.fields).map(([name, type]) =>
      ts.createPropertySignature(
        undefined,
        ts.createIdentifier(name),
        undefined,
        generateInputField(schema, type),
        undefined
      )
    )
  )
}

function generateInputField(schema: SchemaIR, type: TypeIR): ts.TypeNode {
  if (type.kind == 'namedType') {
    return ts.createTypeReferenceNode(
      ts.createIdentifier(type.typename),
      undefined
    )
  }
  return generateType(schema, type)
}
