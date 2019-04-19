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
  ) => Promise<OperationResult<T, Name>>

  useMutation<Name extends Mutation<T>>(
    config: OperationConfig<T, Name>
  ): Promise<OperationResult<T, Name>>

  useSubscription<Name extends Subscription<T>>(
    config: OperationConfig<T, Name>
  ): Promise<SubscriptionResult<T, Name>>
}
