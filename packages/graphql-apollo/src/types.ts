import {
  Query,
  OperationData,
  Mutation,
  OperationVariables,
} from '@bearbytes/graphql-to-typescript'
import { QueryOptions, ApolloQueryResult, MutationOptions } from 'apollo-client'
import { FetchResult, Observable } from 'apollo-link'

export interface Client<GQL> {
  query: <Name extends Query<GQL>>(
    config: QueryConfig<GQL, Name>
  ) => Promise<QueryResult<GQL, Name>>

  watchQuery: <Name extends Query<GQL>>(
    config: QueryConfig<GQL, Name>
  ) => Observable<QueryResult<GQL, Name>>

  mutate<Name extends Mutation<GQL>>(
    config: MutateConfig<GQL, Name>
  ): Promise<MutateResult<GQL, Name>>

  // subscribe<Name extends Subscription<T>>(
  //   config: OperationConfig<T, Name>
  // ): Promise<SubscriptionResult<T, Name>>
}

export type QueryConfig<GQL, Name extends keyof GQL> = Omit<
  QueryOptions,
  'query' | 'variables'
> & {
  operationName: Name
} & ({} extends OperationVariables<GQL, Name>
    ? { variables?: OperationVariables<GQL, Name> }
    : { variables: OperationVariables<GQL, Name> })

export type QueryResult<GQL, Name extends keyof GQL> = ApolloQueryResult<
  OperationData<GQL, Name>
>

export type MutateConfig<GQL, Name extends keyof GQL> = Omit<
  MutationOptions,
  'mutation' | 'variables'
> & {
  operationName: Name
} & ({} extends OperationVariables<GQL, Name>
    ? { variables?: OperationVariables<GQL, Name> }
    : { variables: OperationVariables<GQL, Name> })

export type MutateResult<GQL, Name extends keyof GQL> = FetchResult<
  OperationData<GQL, Name>
>

// export interface SubscriptionResult<T, Name extends Subscription<T>> {}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
