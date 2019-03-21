import { GraphQLObjectType } from 'graphql'

export interface ObjectTypeIR {
  kind: 'object'
}
export function transformObjectType(T: GraphQLObjectType): ObjectTypeIR {
  return {
    kind: 'object',
  }
}
