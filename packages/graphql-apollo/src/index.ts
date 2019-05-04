import {
  Query,
  Mutation,
  OperationData,
} from '@bearbytes/graphql-to-typescript'
import {
  Client,
  QueryConfig,
  QueryResult,
  MutateResult,
  MutateConfig,
} from './types'
import { ApolloClient } from 'apollo-client'

export * from './types'

export function createClient<GQL extends Record<string, any>>(
  typedGraphQL: GQL,
  apolloClient: ApolloClient<any>
): Client<GQL> {
  return { query, mutate }

  function query<Name extends Query<GQL>>(
    config: QueryConfig<GQL, Name>
  ): Promise<QueryResult<GQL, Name>> {
    return apolloClient.query({
      ...config,
      query: typedGraphQL[config.operationName],
      variables: config.variables,
    })
  }

  function mutate<Name extends Mutation<GQL>>(
    config: MutateConfig<GQL, Name>
  ): Promise<MutateResult<GQL, Name>> {
    return apolloClient.mutate<OperationData<GQL, Name>>({
      ...config,
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
