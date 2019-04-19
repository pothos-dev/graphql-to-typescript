import {
  Query,
  OperationData,
  Mutation,
  Subscription,
  OperationVariables,
} from '@bearbytes/graphql-to-typescript'
import {
  OperationConfig,
  OperationResult,
  SubscriptionResult,
} from '@bearbytes/graphql-axios'

export interface Hooks<T> {
  useQuery: <Name extends Query<T>>(
    config: OperationConfig<T, Name>
  ) => OperationResult<T, Name> | undefined

  // useMutation<Name extends Mutation<T>>(
  //   config: OperationConfig<T, Name>
  // ): () => void

  // useSubscription<Name extends Subscription<T>>(
  //   config: OperationConfig<T, Name>
  // ): Promise<SubscriptionResult<T, Name>>
}
