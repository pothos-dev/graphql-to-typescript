import { GraphQLSchema } from 'graphql'
import { transformType, TypeIR } from './TypeIR'
import { TypeMap } from 'graphql/type/schema'

export interface SchemaIR {
  types: Record<string, TypeIR>
  queryTypeName?: string
  mutationTypeName?: string
  subscriptionTypeName?: string
}

export function transformSchema(schema: GraphQLSchema): SchemaIR {
  return {
    types: transformAllTypes(schema.getTypeMap()),
    queryTypeName: schema.getQueryType()?.name,
    mutationTypeName: schema.getMutationType()?.name,
    subscriptionTypeName: schema.getSubscriptionType()?.name,
  }
}

function transformAllTypes(typeMap: TypeMap): Record<string, TypeIR> {
  // transform each Type in the schema to intermediate representation
  const types: Record<string, TypeIR> = {}

  for (const [name, type] of Object.entries(typeMap)) {
    // ignore types starting with __
    if (type.name.startsWith('__')) continue
    types[name] = transformType(type, true)
  }

  return types
}
