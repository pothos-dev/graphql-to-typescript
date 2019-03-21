import { GraphQLInterfaceType } from 'graphql'

export interface InterfaceTypeIR {
  kind: 'interface'
}

export function transformInterfaceType(
  T: GraphQLInterfaceType
): InterfaceTypeIR {
  return {
    kind: 'interface',
  }
}
