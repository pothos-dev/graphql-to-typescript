import { Hooks } from './types'
import {
  Query,
  Mutation,
  OperationData,
} from '@bearbytes/graphql-to-typescript'
import { useState, useEffect, DependencyList, useCallback } from 'react'
import {
  Client,
  QueryConfig,
  QueryResult,
  MutateConfig,
  MutateResult,
} from '@bearbytes/graphql-apollo'
import { ApolloQueryResult, NetworkStatus } from 'apollo-client'

export function createHooks<GQL>(client: Client<GQL>): Hooks<GQL> {
  return { useQuery, useMutation }

  function useQuery<Name extends Query<GQL>>(
    config: QueryConfig<GQL, Name>,
    deps: DependencyList = []
  ): QueryResult<GQL, Name> {
    const [result, setResult] = useState<
      ApolloQueryResult<OperationData<GQL, Name>>
    >({
      data: null as any,
      loading: true,
      networkStatus: NetworkStatus.loading,
      stale: false,
    })

    useEffect(() => {
      const subscription = client.watchQuery(config).subscribe(setResult)
      return () => subscription.unsubscribe()
    }, deps)

    return result
  }

  function useMutation<Name extends Mutation<GQL>, Args extends any[]>(
    mutate: (...args: Args) => MutateConfig<GQL, Name>,
    deps?: DependencyList
  ): (...args: Args) => Promise<MutateResult<GQL, Name>> {
    const f = (...args: Args) => {
      const config = mutate(...args)
      return client.mutate(config)
    }
    if (deps) {
      return useCallback(f, deps)
    } else {
      return f
    }
  }

  // function useSubscription<Name extends Subscription<T>>(
  //   config: OperationConfig<T, Name>
  // ): Promise<SubscriptionResult<T, Name>>
}
