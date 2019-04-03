export type Nullable<T> = T | null
export type Operation<Kind, Variables, Data> = {}

// Library Types
export type Mutation<T> = {
  [Name in keyof T]: OperationKind<T, Name> extends 'mutation' ? Name : never
}[keyof T]
export type Query<T> = {
  [Name in keyof T]: OperationKind<T, Name> extends 'query' ? Name : never
}[keyof T]
export type Subscription<T> = {
  [Name in keyof T]: OperationKind<T, Name> extends 'subscription'
    ? Name
    : never
}[keyof T]
export type OperationKind<T, Name extends keyof T> = T[Name] extends Operation<
  infer Kind,
  any,
  any
>
  ? Kind
  : never
export type OperationVariables<
  T,
  Name extends keyof T
> = T[Name] extends Operation<any, infer Variables, any> ? Variables : never
export type OperationData<T, Name extends keyof T> = T[Name] extends Operation<
  any,
  any,
  infer Data
>
  ? Data
  : never
