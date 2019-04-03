import ts from 'typescript'
import { SchemaIR } from '../transform/SchemaIR'
import { UnionTypeIR } from '../transform/UnionTypeIR'
import { SelectionSetIR } from '../transform/SelectionIR'
import { generateObjectType } from './ObjectType'

export function generateUnionType(
  schema: SchemaIR,
  schemaType: UnionTypeIR,
  selectionSet?: SelectionSetIR
) {
  if (selectionSet == null) {
    throw 'expected UnionType to have a selectionSet'
  }

  return ts.createUnionTypeNode(
    schemaType.types.map((it) => {
      if (it.kind != 'namedType') {
        throw 'Expected union element to be NamedTypeIR, but is ' + it.kind
      }
      const elementTypename = it.typename
      const elementType = schema.types[elementTypename]
      if (elementType.kind !== 'object') {
        throw 'Expected Union element to be ObjectTypeIR, but is ' +
          elementType.kind
      }

      const elementSelectionSet = selectionSet.unions[elementTypename]
      return generateObjectType(
        schema,
        elementType,
        elementSelectionSet,
        elementTypename
      )
    })
  )
}
