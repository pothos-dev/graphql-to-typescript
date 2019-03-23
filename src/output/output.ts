import gql from 'graphql-tag'
type __typed_query<D, V> = any
type __typed_mutation<D, V> = any
type __typed_subscription<D, V> = any
type Nullable<T> = T | null
const testScalars: __typed_query<
  {},
  {
    scalarString: Nullable<string>,
    scalarInt: Nullable<number>,
    scalarFloat: Nullable<number>,
    scalarBoolean: Nullable<boolean>,
    scalarID: Nullable<string>,
    scalarCustom: Nullable<unknown>,
    renamedString: Nullable<string>,
  }
> = gql`
  query testScalars {
    scalarString
    scalarInt
    scalarFloat
    scalarBoolean
    scalarID
    scalarCustom
    renamedString: scalarString
  }
`
const testNullability: __typed_query<
  {},
  {
    nullableBoolean: Nullable<boolean>,
    nonNullableBoolean: boolean,
  }
> = gql`
  query testNullability {
    nullableBoolean
    nonNullableBoolean
  }
`
