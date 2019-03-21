import { GraphQLInputObjectType } from 'graphql'

export interface InputObjectTypeIR {
  kind: 'inputObject'
}

export function transformInputObjectType(
  T: GraphQLInputObjectType
): InputObjectTypeIR {
  return { kind: 'inputObject' }
}
