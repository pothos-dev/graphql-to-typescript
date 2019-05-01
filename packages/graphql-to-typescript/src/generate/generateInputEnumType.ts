import ts from 'typescript'
import { EnumTypeIR } from '../transform/EnumTypeIR'

export function generateInputEnumType(schemaType: EnumTypeIR) {
  return ts.createUnionTypeNode(
    schemaType.values.map((value) =>
      ts.createLiteralTypeNode(ts.createStringLiteral(value))
    )
  )
}
