import GraphQL from './outputs/output'
import {
  Query,
  OperationVariables,
  OperationData,
  Operation,
  Mutation,
  Subscription,
} from '@bearbytes/graphql-to-typescript'

async function tryAxios() {
  const client: Client<typeof GraphQL> = null as any

  const response = await client.query('testMethods', {
    variables: {
      reqParam: 'stringy boy',
      optParam: 23,
      list2: ['hello', 'world'],
      input: null,
    },
  })
}
