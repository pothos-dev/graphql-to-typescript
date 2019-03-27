import { GraphQLInputObjectType } from 'graphql'
import { TypeIR, transformType } from './TypeIR'
import { values, fromPairs } from 'lodash'

export interface InputObjectTypeIR {
  kind: 'inputObject'
  fields: Record<string, TypeIR>
}

export function transformInputObjectType(
  T: GraphQLInputObjectType
): InputObjectTypeIR {
  const fields = fromPairs(
    values(T.getFields()).map((it) => [it.name, transformType(it.type)])
  )

  return { kind: 'inputObject', fields }
}
