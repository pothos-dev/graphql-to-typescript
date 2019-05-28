import { Hooks, ClientProviderProps } from './types'
import {
  Query,
  Mutation,
  OperationData,
} from '@bearbytes/graphql-to-typescript'
import React, {
  useState,
  useEffect,
  DependencyList,
  useCallback,
  createContext,
  useContext,
} from 'react'
import {
  Client,
  QueryConfig,
  QueryResult,
  MutateConfig,
  MutateResult,
} from '@bearbytes/typed-apollo-client'
import { ApolloQueryResult, NetworkStatus } from 'apollo-client'

export function createHooks<GQL>(
  globalClientInstance: Client<GQL>
): Hooks<GQL> {
  const context = createContext(globalClientInstance)

  return { ClientProvider, useClient, useQuery, useMutation }

  function ClientProvider(props: ClientProviderProps<GQL>) {
    return (
      <context.Provider value={props.client}>{props.children}</context.Provider>
    )
  }

  function useClient() {
    return useContext(context)
  }

  function useQuery<Name extends Query<GQL>>(
    config: QueryConfig<GQL, Name>,
    deps: DependencyList = []
  ): QueryResult<GQL, Name> {
    const client = useClient()

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

  function useMutation1() {
    const client = useClient()
    return client.mutate
  }
  function useMutation2<Name extends Mutation<GQL>, Args extends any[]>(
    mutate: (...args: Args) => MutateConfig<GQL, Name>,
    deps?: DependencyList
  ): (...args: Args) => Promise<MutateResult<GQL, Name>> {
    const client = useClient()

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
  function useMutation(arg1?: any, arg2?: any) {
    if (arg1 == null) {
      return useMutation1()
    } else {
      return useMutation2(arg1, arg2)
    }
  }

  // function useSubscription<Name extends Subscription<T>>(
  //   config: OperationConfig<T, Name>
  // ): Promise<SubscriptionResult<T, Name>>
}
