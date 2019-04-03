import { Client, OperationOptions, OperationResult, Config } from './types'
import axios, { AxiosRequestConfig } from 'axios'
import { Query, Mutation } from '@bearbytes/graphql-to-typescript'

export * from './types'

export function createClient<T>(
  typedGraphQL: T,
  clientConfig: Config
): Client<T> {
  return {
    query: executeOperation,
    mutate: executeOperation,
    subscribe: () => {
      throw Error('not yet implemented')
    },
  }

  async function executeOperation<Name extends Query<T> | Mutation<T>>(
    operationName: Name,
    options: OperationOptions<T, Name>
  ): Promise<OperationResult<T, Name>> {
    const { url } = clientConfig

    const body = {
      operationName,
      query: typedGraphQL[operationName],
      variables: options.variables,
    }

    const response = await axios.post(
      url,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      // axiosConfig
    )
    return response
  }
}
