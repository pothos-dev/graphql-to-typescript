import {
  Client,
  OperationConfig,
  OperationResult,
} from '@bearbytes/graphql-axios'
import { Hooks } from './types'
import { Query, Mutation, Subscription } from '@bearbytes/graphql-to-typescript'
import { useState } from 'react'

export function createHooks<T>(client: Client<T>): Hooks<T> {
  return { useQuery }

  function useQuery<Name extends Query<T>>(
    config: OperationConfig<T, Name>
  ): OperationResult<T, Name> | undefined {
    const [result, setResult] = useState<OperationResult<T, Name> | undefined>(
      undefined
    )
    client.query(config).then(setResult)
    return result
  }

  // function useMutation<Name extends Mutation<T>>(
  //   config: OperationConfig<T, Name>
  // ): () => void {}

  // function useSubscription<Name extends Subscription<T>>(
  //   config: OperationConfig<T, Name>
  // ): Promise<SubscriptionResult<T, Name>>
}
