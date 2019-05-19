import { Query, Mutation } from '@bearbytes/graphql-to-typescript'
import { ComponentType, DependencyList } from 'react'
import {
  QueryConfig,
  QueryResult,
  MutateConfig,
  MutateResult,
  Client,
} from '@bearbytes/typed-apollo-client'

export interface Hooks<GQL> {
  ClientProvider: ComponentType<ClientProviderProps<GQL>>

  useClient(): Client<GQL>

  useQuery: <Name extends Query<GQL>>(
    config: QueryConfig<GQL, Name>,
    deps?: DependencyList
  ) => QueryResult<GQL, Name>

  useMutation<Name extends Mutation<GQL>, Args extends any[]>(
    mutate: (...args: Args) => MutateConfig<GQL, Name>,
    deps?: DependencyList
  ): (...args: Args) => Promise<MutateResult<GQL, Name>>

  // useSubscription<Name extends Subscription<T>>(
  //   config: OperationConfig<T, Name>
  // ): Promise<SubscriptionResult<T, Name>>
}

export interface ClientProviderProps<GQL> {
  client: Client<GQL>
  children?: any
}
