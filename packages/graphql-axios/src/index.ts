import { Client, OperationOptions, OperationResult, Config } from './types'
import axios, { AxiosRequestConfig } from 'axios'
import { Query, Mutation } from '@bearbytes/graphql-client-types'

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
    const { url, axiosConfig } = clientConfig
    const response = await axios.post(
      url,
      {
        query: typedGraphQL[operationName],
        variables: options.variables,
      },
      axiosConfig
    )
    return response
  }
}
