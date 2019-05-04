import {
  Query,
  Mutation,
  OperationData,
} from '@bearbytes/graphql-to-typescript'
import { Client, OperationConfig } from './types'
import { ApolloClient, ApolloQueryResult } from 'apollo-client'
import { FetchResult } from 'apollo-link'

export * from './types'

export function createClient<GQL extends Record<string, any>>(
  typedGraphQL: GQL,
  apolloClient: ApolloClient<any>
): Client<GQL> {
  return { query, mutate }

  function query<Name extends Query<GQL>>(
    config: OperationConfig<GQL, Name>
  ): Promise<ApolloQueryResult<OperationData<GQL, Name>>> {
    return apolloClient.query({
      query: typedGraphQL[config.operationName],
      variables: config.variables,
    })
  }

  function mutate<Name extends Mutation<GQL>>(
    config: OperationConfig<GQL, Name>
  ): Promise<FetchResult<OperationData<GQL, Name>>> {
    return apolloClient.mutate({
      mutation: typedGraphQL[config.operationName],
      variables: config.variables,
    })
  }

  // function subscribe<Name extends Subscription<T>>(
  //   config: OperationConfig<T, Name>
  // ): Promise<SubscriptionResult<T, Name>> {
  //   throw Error('not yet implemented')
  // }
}
