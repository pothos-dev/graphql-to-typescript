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
import gql from 'graphql-tag'
import { Observable, DocumentNode, FetchResult } from 'apollo-link'
import { DataProxy } from 'apollo-cache'

export * from './types'

export function createClient<GQL extends Record<string, any>>(
  typedGraphQL: GQL,
  apolloClient: ApolloClient<any>
): Client<GQL> {
  const queries: Record<any, DocumentNode> = {}
  for (const [operationName, gqlString] of Object.entries(typedGraphQL)) {
    queries[operationName] = gql(gqlString)
  }

  return { queries, query, watchQuery, mutate }

  function query<Name extends Query<GQL>>(
    config: QueryConfig<GQL, Name>
  ): Promise<QueryResult<GQL, Name>> {
    return apolloClient.query({
      ...config,
      query: queries[config.operationName],
      variables: config.variables,
    })
  }

  function watchQuery<Name extends Query<GQL>>(
    config: QueryConfig<GQL, Name>
  ): Observable<QueryResult<GQL, Name>> {
    return apolloClient.watchQuery({
      ...config,
      query: queries[config.operationName],
      variables: config.variables,
    })
  }

  function mutate<Name extends Mutation<GQL>>(
    config: MutateConfig<GQL, Name>
  ): Promise<MutateResult<GQL, Name>> {
    return apolloClient.mutate<OperationData<GQL, Name>>({
      ...config,
      mutation: queries[config.operationName],
      variables: config.variables,
      update: transformUpdate(),
    })

    function transformUpdate() {
      if (!config.update) return
      return function(
        proxy: DataProxy,
        result: FetchResult<OperationData<GQL, Name>>
      ) {
        if (!config.update) return
        return config.update(
          {
            readQuery: ({ operationName, variables }) => {
              const query = queries[operationName]
              return proxy.readQuery({ query, variables }) as any
            },
            writeQuery: ({ operationName, variables, data }) => {
              const query = queries[operationName]
              return proxy.writeQuery({ query, variables, data })
            },
            updateQuery: ({ operationName, variables }, mutate) => {
              const query = queries[operationName]
              let data = proxy.readQuery({ query, variables }) as any
              data = mutate(data) || data
              proxy.writeQuery({ query, variables, data })
            },
          },
          result
        )
      }
    }
  }

  // function subscribe<Name extends Subscription<T>>(
  //   config: OperationConfig<T, Name>
  // ): Promise<SubscriptionResult<T, Name>> {
  //   throw Error('not yet implemented')
  // }
}
