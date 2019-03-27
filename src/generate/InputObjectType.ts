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
