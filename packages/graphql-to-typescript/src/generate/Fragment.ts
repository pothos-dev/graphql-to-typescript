import ts from 'typescript'
import { FragmentIR } from '../transform/FragmentIR'
import { SchemaIR } from '../transform/SchemaIR'
import { generateObjectType } from './ObjectType'

export function generateFragment(
  schema: SchemaIR,
  fragment: FragmentIR
): ts.TypeAliasDeclaration {
  const typename = fragment.schemaObjectName
  const objectType = schema.types[fragment.schemaObjectName]
  if (objectType.kind != 'object')
    throw Error(
      'Expected fragment to contain objectType, but has ' + objectType.kind
    )

  return ts.createTypeAliasDeclaration(
    undefined,
    [ts.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.createIdentifier(fragment.name),
    undefined,
    generateObjectType(schema, objectType, fragment.selectionSet, typename)
  )
}
