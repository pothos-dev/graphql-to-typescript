import {
  Query,
  OperationData,
  Mutation,
  Subscription,
  OperationVariables,
} from '@bearbytes/graphql-to-typescript'
import { GraphQLError } from 'graphql'
import { QueryOptions, ApolloQueryResult } from 'apollo-client'
import { FetchResult } from 'apollo-link'

export interface Client<GQL> {
  query: <Name extends Query<GQL>>(
    config: OperationConfig<GQL, Name>
  ) => Promise<ApolloQueryResult<OperationData<GQL, Name>>>

  mutate<Name extends Mutation<GQL>>(
    config: OperationConfig<GQL, Name>
  ): Promise<FetchResult<OperationData<GQL, Name>>>

  // subscribe<Name extends Subscription<T>>(
  //   config: OperationConfig<T, Name>
  // ): Promise<SubscriptionResult<T, Name>>
}

export type OperationConfig<T, Name extends keyof T> = QueryOptions & {
  operationName: Name
} & ({} extends OperationVariables<T, Name>
    ? { variables?: OperationVariables<T, Name> }
    : { variables: OperationVariables<T, Name> })

export interface OperationResult<T, Name extends keyof T> {
  data?: OperationData<T, Name>
  errors?: GraphQLError[]
}

// export interface SubscriptionResult<T, Name extends Subscription<T>> {}
