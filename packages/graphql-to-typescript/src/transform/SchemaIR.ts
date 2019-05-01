import { GraphQLSchema } from 'graphql'
import { values, zipObj, keys } from 'rambda'
import { transformType, TypeIR } from './TypeIR'

export interface SchemaIR {
  types: Record<string, TypeIR>
  queryTypeName?: string
  mutationTypeName?: string
  subscriptionTypeName?: string
}

export function transformSchema(schema: GraphQLSchema): SchemaIR {
  const types = zipObj(
    keys(schema.getTypeMap()) as string[],
    values(schema.getTypeMap())
      .filter((T) => !T.name.startsWith('__'))
      .map((T) => transformType(T, true))
  )

  const queryType = schema.getQueryType()
  const mutationType = schema.getMutationType()
  const subscriptionType = schema.getSubscriptionType()

  return {
    types,
    queryTypeName: (queryType && queryType.name) || undefined,
    mutationTypeName: (mutationType && mutationType.name) || undefined,
    subscriptionTypeName:
      (subscriptionType && subscriptionType.name) || undefined,
  }
}
