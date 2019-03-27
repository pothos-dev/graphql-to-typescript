export type Nullable<T> = T | null
export type Operation<Kind, Variables, Data> = {}

// Library Types
export type __Mutation<T> = {
  [Name in keyof T]: OperationKind<T, Name> extends 'mutation' ? Name : never
}[keyof T]
export type __Query<T> = {
  [Name in keyof T]: OperationKind<T, Name> extends 'query' ? Name : never
}[keyof T]
export type __Subscription<T> = {
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
export type __OperationVariables<
  T,
  Name extends keyof T
> = T[Name] extends Operation<any, infer Variables, any> ? Variables : never
export type __OperationData<
  T,
  Name extends keyof T
> = T[Name] extends Operation<any, any, infer Data> ? Data : never
