import {
  GraphQLType,
  isScalarType,
  isObjectType,
  isInterfaceType,
  isUnionType,
  isEnumType,
  isInputObjectType,
  isListType,
  isNonNullType,
  isNamedType,
  TypeNode,
} from 'graphql'
import { ScalarTypeIR, transformScalarType } from './ScalarTypeIR'
import {
  InputObjectTypeIR,
  transformInputObjectType,
} from './InputObjectTypeIR'
import { transformObjectType, ObjectTypeIR } from './ObjectTypeIR'
import { UnionTypeIR, transformUnionType } from './UnionTypeIR'
import { transformEnumType, EnumTypeIR } from './EnumTypeIR'
import { InterfaceTypeIR, transformInterfaceType } from './InterfaceTypeIR'
import { NamedTypeIR, transformNamedType } from './NamedTypeIR'
import { NonNullTypeIR, transformNonNull } from './NonNullTypeIR'
import { transformListType, ListTypeIR } from './ListTypeIR'

export type TypeIR =
  | NamedTypeIR
  | ScalarTypeIR
  | ObjectTypeIR
  | InterfaceTypeIR
  | UnionTypeIR
  | EnumTypeIR
  | InputObjectTypeIR
  | NonNullTypeIR
  | ListTypeIR

export function transformType(T: GraphQLType): TypeIR
export function transformType(T: GraphQLType, skipNamedTypes: boolean): TypeIR
export function transformType(T: GraphQLType, skipNamedTypes?: boolean) {
  if (isScalarType(T)) {
    return transformScalarType(T)
  }
  if (!skipNamedTypes && isNamedType(T)) {
    return transformNamedType(T)
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
  if (isListType(T)) {
    return transformListType(T)
  }
  if (isNonNullType(T)) {
    return transformNonNull(T)
  }
  throw { message: 'unhandled type in transformType' }
}

export function identifyType(T: GraphQLType): string {
  if (isNamedType(T)) return 'NamedType'
  if (isScalarType(T)) return 'Scalar'
  if (isObjectType(T)) return 'Object'
  if (isInterfaceType(T)) return 'Interface'
  if (isUnionType(T)) return 'Union'
  if (isEnumType(T)) return 'Enum'
  if (isInputObjectType(T)) return 'InputIbject'
  if (isListType(T)) return 'List'
  if (isNonNullType(T)) return 'NonNull'
  throw 'unexpected type in identifyType'
}
