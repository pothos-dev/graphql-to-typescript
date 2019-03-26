import gql from 'graphql-tag'
type __typed_query<D, V> = any
type __typed_mutation<D, V> = any
type __typed_subscription<D, V> = any
type Nullable<T> = T | null
const testScalars: __typed_query<
  {},
  {
    scalarString: Nullable<string>
    scalarInt: Nullable<number>
    scalarFloat: Nullable<number>
    scalarBoolean: Nullable<boolean>
    scalarID: Nullable<string>
    scalarCustom: Nullable<unknown>
    renamedString: Nullable<string>
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
    nullableBoolean: Nullable<boolean>
    nonNullableBoolean: boolean
  }
> = gql`
  query testNullability {
    nullableBoolean
    nonNullableBoolean
  }
`
const testNesting: __typed_query<
  {},
  {
    nestedObject: Nullable<{
      recursive: Nullable<{
        recursive: Nullable<{
          scalar: Nullable<boolean>
        }>
      }>
      nested: Nullable<{
        scalar: Nullable<number>
      }>
      scalar: Nullable<boolean>
      list: Nullable<ReadonlyArray<string>>
    }>
  }
> = gql`
  query testNesting {
    nestedObject {
      recursive {
        recursive {
          scalar
        }
      }
      nested {
        scalar
      }
      scalar
      list
    }
  }
`
const testUnion: __typed_query<
  {},
  {
    union: Nullable<
      | {
          __typename: 'Tomato'
          id: Nullable<string>
          color: Nullable<string>
        }
      | {
          __typename: 'Potato'
          id: Nullable<string>
          origin: Nullable<string>
        }
    >
  }
> = gql`
  query testUnion {
    union {
      ... on Tomato {
        id
        color
      }
      ... on Potato {
        id
        origin
      }
    }
  }
`
