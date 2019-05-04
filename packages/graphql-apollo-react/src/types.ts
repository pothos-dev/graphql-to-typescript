import { Query, Mutation } from '@bearbytes/graphql-to-typescript'
import { DependencyList } from 'react'
import {
  QueryConfig,
  QueryResult,
  MutateConfig,
  MutateResult,
} from '@bearbytes/graphql-apollo'

export interface Hooks<GQL> {
  useQuery: <Name extends Query<GQL>>(
    config: QueryConfig<GQL, Name>,
    deps?: DependencyList
  ) => QueryResult<GQL, Name>

  useMutation<Name extends Mutation<GQL>, Args extends any[]>(
    mutate: (...args: Args) => MutateConfig<GQL, Name>
  ): (...args: Args) => Promise<MutateResult<GQL, Name>>

  // useSubscription<Name extends Subscription<T>>(
  //   config: OperationConfig<T, Name>
  // ): Promise<SubscriptionResult<T, Name>>
}
