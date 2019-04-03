import typedGraphQL from '../outputs/output'
import { createClient } from '@bearbytes/graphql-axios'
import {
  Query,
  OperationData,
  Mutation,
  Subscription,
  OperationVariables,
} from '@bearbytes/graphql-to-typescript'

test('empty', () => {})

async function tryAxios() {
  const client = createClient<typeof typedGraphQL>(typedGraphQL, {
    url: 'http://localhost:5000',
  })
  client.query
}
