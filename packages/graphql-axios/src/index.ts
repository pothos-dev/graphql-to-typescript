import axios from 'axios'
import { Query, Mutation } from '@bearbytes/graphql-to-typescript'
import { Client, ClientConfig, OperationConfig, OperationResult } from './types'

export * from './types'

export function createClient<T extends Record<string, any>>(
  typedGraphQL: T,
  clientConfig: ClientConfig
): Client<T> {
  return { query, mutate }

  function query<Name extends Query<T>>(
    config: OperationConfig<T, Name>
  ): Promise<OperationResult<T, Name>> {
    return sendRequest({
      operationName: config.operationName,
      query: typedGraphQL[config.operationName],
      variables: config.variables,
    })
  }

  function mutate<Name extends Mutation<T>>(
    config: OperationConfig<T, Name>
  ): Promise<OperationResult<T, Name>> {
    return sendRequest({
      operationName: config.operationName,
      query: typedGraphQL[config.operationName],
      variables: config.variables,
    })
  }

  // function subscribe<Name extends Subscription<T>>(
  //   config: OperationConfig<T, Name>
  // ): Promise<SubscriptionResult<T, Name>> {
  //   throw Error('not yet implemented')
  // }

  async function sendRequest(body: {
    operationName: keyof T
    query: string
    variables?: object
  }) {
    const { url } = clientConfig

    const response = await axios.post(url, body, {
      ...clientConfig.axiosConfig,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  }
}
