import {
  Query,
  OperationData,
  Mutation,
  Subscription,
  OperationVariables,
} from '@bearbytes/graphql-to-typescript'
import { AxiosRequestConfig } from 'axios'

export interface ClientConfig {
  url: string
  axiosConfig?: AxiosRequestConfig
}

export interface Client<T> {
  query: <Name extends Query<T>>(
    config: OperationConfig<T, Name>
  ) => Promise<OperationResult<T, Name>>

  mutate<Name extends Mutation<T>>(
    config: OperationConfig<T, Name>
  ): Promise<OperationResult<T, Name>>

  // subscribe<Name extends Subscription<T>>(
  //   config: OperationConfig<T, Name>
  // ): Promise<SubscriptionResult<T, Name>>
}

export type OperationConfig<
  T,
  Name extends keyof T
> = {} extends OperationVariables<T, Name>
  ? {
      operationName: Name
      variables?: OperationVariables<T, Name>
    }
  : {
      operationName: Name
      variables: OperationVariables<T, Name>
    }

export interface OperationResult<T, Name extends keyof T> {
  data: OperationData<T, Name>
}

// export interface SubscriptionResult<T, Name extends Subscription<T>> {}
