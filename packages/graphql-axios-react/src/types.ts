import { Query, Mutation } from '@bearbytes/graphql-to-typescript'
import { OperationConfig, OperationResult } from '@bearbytes/graphql-axios'
import { DependencyList } from 'react'

export interface Hooks<T> {
  useQuery: <Name extends Query<T>>(
    config: OperationConfig<T, Name>,
    deps?: DependencyList
  ) => OperationResult<T, Name>

  useMutation<Name extends Mutation<T>, Args extends any[]>(
    mutate: (...args: Args) => OperationConfig<T, Name>
  ): (...args: Args) => Promise<OperationResult<T, Name>>

  // useSubscription<Name extends Subscription<T>>(
  //   config: OperationConfig<T, Name>
  // ): Promise<SubscriptionResult<T, Name>>
}
