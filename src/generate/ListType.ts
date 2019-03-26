import ts from 'typescript'
import { SchemaIR } from '../transform/SchemaIR'
import { generateType } from './Type'
import { ListTypeIR } from '../transform/ListTypeIR'

export function generateListType(schema: SchemaIR, schemaType: ListTypeIR) {
  return ts.createTypeReferenceNode(ts.createIdentifier('ReadonlyArray'), [
    ts.createTypeReferenceNode(
      generateType(schema, schemaType.wrappedType),
      undefined
    ),
  ])
}
