import gql from 'graphql-tag'
type String = string
type Int = number
type Float = number
type Boolean = boolean
type ID = string
type CustomScalar = string
const testScalars: __typed_query<
  {},
  {
    scalarString: Nullable<String>
    scalarInt: Nullable<Int>
    scalarFloat: Nullable<Float>
    scalarBoolean: Nullable<Boolean>
    scalarID: Nullable<ID>
    scalarCustom: Nullable<CustomScalar>
    renamedString: Nullable<String>
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
    nullableBoolean: Nullable<Boolean>
    nonNullableBoolean: Boolean
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
          scalar: Nullable<Boolean>
        }>
      }>
      nested: Nullable<{
        scalar: Nullable<Int>
      }>
      scalar: Nullable<Boolean>
      list: Nullable<ReadonlyArray<String>>
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
          id: Nullable<ID>
          color: Nullable<String>
        }
      | {
          __typename: 'Potato'
          id: Nullable<ID>
          origin: Nullable<String>
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
const testMethods: __typed_query<
  {},
  {
    method: Nullable<CustomScalar>
    renamedMethod: Nullable<ReadonlyArray<Nullable<CustomScalar>>>
  }
> = gql`
  query testMethods(
    $reqParam: String!
    $optParam: Float!
    $input: InputType
    $list2: [CustomScalar!]!
  ) {
    method(requiredParam: $reqParam, optionalParam: $optParam, input: $input)
    renamedMethod: method2(list2: $list2)
  }
`
type __typed_query<D, V> = any
type __typed_mutation<D, V> = any
type __typed_subscription<D, V> = any
type Nullable<T> = T | null
