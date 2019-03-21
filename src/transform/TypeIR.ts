import {
  GraphQLType,
  isScalarType,
  isObjectType,
  isInterfaceType,
  isUnionType,
  isEnumType,
  isInputObjectType,
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

export type TypeIR =
  | ScalarTypeIR
  | ObjectTypeIR
  | InterfaceTypeIR
  | UnionTypeIR
  | EnumTypeIR
  | InputObjectTypeIR
export function transformType(T: GraphQLType): TypeIR {
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
