import {
  Query,
  OperationData,
  Mutation,
  Subscription,
  OperationVariables,
} from '@bearbytes/graphql-to-typescript'
import { AxiosRequestConfig } from 'axios'

export interface Config {
  url: string
  axiosConfig?: AxiosRequestConfig
}

export interface Client<T> {
  query<Name extends Query<T>>(
    operationName: Name,
    options: OperationOptions<T, Name>
  ): Promise<OperationResult<T, Name>>

  mutate<Name extends Mutation<T>>(
    operationName: Name,
    options: OperationOptions<T, Name>
  ): Promise<OperationResult<T, Name>>

  subscribe<Name extends Subscription<T>>(
    operationName: Name,
    options: OperationOptions<T, Name>
  ): Promise<SubscriptionResult<T, Name>>
}

export interface OperationOptions<T, Name extends keyof T> {
  variables: OperationVariables<T, Name>
}

export interface OperationResult<T, Name extends keyof T> {
  data: OperationData<T, Name>
}

export interface SubscriptionResult<T, Name extends Subscription<T>> {}
