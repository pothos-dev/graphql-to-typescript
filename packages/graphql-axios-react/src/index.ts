import {
  Client,
  OperationConfig,
  OperationResult,
} from '@bearbytes/graphql-axios'
import { Hooks } from './types'
import { Query, Mutation, Subscription } from '@bearbytes/graphql-to-typescript'
import { useState, useEffect, DependencyList, useCallback } from 'react'

export function createHooks<T>(client: Client<T>): Hooks<T> {
  return { useQuery, useMutation }

  function useQuery<Name extends Query<T>>(
    config: OperationConfig<T, Name>,
    deps: DependencyList = []
  ): OperationResult<T, Name> {
    const [result, setResult] = useState<OperationResult<T, Name>>({})
    useEffect(() => {
      client.query(config).then(setResult)
    }, deps)
    return result
  }

  function useMutation<Name extends Mutation<T>, Args extends any[]>(
    mutate: (...args: Args) => OperationConfig<T, Name>
  ): (...args: Args) => Promise<OperationResult<T, Name>> {
    return useCallback((...args: Args) => {
      const config = mutate(...args)
      return client.mutate(config)
    }, [])
  }

  // function useSubscription<Name extends Subscription<T>>(
  //   config: OperationConfig<T, Name>
  // ): Promise<SubscriptionResult<T, Name>>
}
