import {
  GraphQLSchema,
  GraphQLNamedType,
  isScalarType,
  GraphQLScalarType,
  isObjectType,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLUnionType,
  isInterfaceType,
  isUnionType,
  isEnumType,
  isInputObjectType,
  GraphQLType,
} from 'graphql'
import { values, compose } from 'rambda'

interface SchemaIR {
  types: NamedTypeIR[]
}
export default function transformSchema(schema: GraphQLSchema): SchemaIR {
  const types = values(schema.getTypeMap())
    .filter((T) => !T.name.startsWith('__'))
    .map(transformNamedType)

  return { types }
}

type NamedTypeIR = TypeIR & {
  typename: string
}
function transformNamedType(T: GraphQLNamedType): NamedTypeIR {
  const typename = T.name
  if (typename.startsWith('__')) return

  const type = transformType(T)
  return { ...type, typename }
}

type TypeIR =
  | ScalarTypeIR
  | ObjectTypeIR
  | InterfaceTypeIR
  | UnionTypeIR
  | EnumTypeIR
  | InputObjectTypeIR
function transformType(T: GraphQLType): TypeIR {
  if (isScalarType(T)) {
    return transformScalarType(T)
  }
  if (isObjectType(T)) {
    return transformObjectType(T)
  }
  if (isInterfaceType(T)) {
    return transformInterfaceType(T)
  }
  if (isUnionType(T)) {
    return transformUnionType(T)
  }
  if (isEnumType(T)) {
    return transformEnumType(T)
  }
  if (isInputObjectType(T)) {
    return transformInputObjectType(T)
  }
}

interface ScalarTypeIR {
  kind: 'scalar'
  scalar: string
}
function transformScalarType(T: GraphQLScalarType): ScalarTypeIR {
  return {
    kind: 'scalar',
    scalar: T.name,
  }
}

interface ObjectTypeIR {
  kind: 'object'
}
function transformObjectType(T: GraphQLObjectType): ObjectTypeIR {
  return {
    kind: 'object',
  }
}

interface InterfaceTypeIR {
  kind: 'interface'
}
function transformInterfaceType(T: GraphQLInterfaceType): InterfaceTypeIR {
  return {
    kind: 'interface',
  }
}

interface UnionTypeIR {
  kind: 'union'
}
function transformUnionType(T: GraphQLUnionType): UnionTypeIR {
  return { kind: 'union' }
}

interface EnumTypeIR {
  kind: 'enum'
}
function transformEnumType(T: GraphQLEnumType): EnumTypeIR {
  return { kind: 'enum' }
}

interface InputObjectTypeIR {
  kind: 'inputObject'
}
function transformInputObjectType(
  T: GraphQLInputObjectType
): InputObjectTypeIR {
  return { kind: 'inputObject' }
}
