import gql from 'graphql-tag'
type String = string
type Int = number
type Float = number
type Boolean = boolean
type ID = string
type CustomScalar = string
interface InputType {
  recursive: InputType
  nested: NestedInputType
  scalar: Nullable<Boolean>
  list: Nullable<ReadonlyArray<String>>
}
interface NestedInputType {
  scalar: Nullable<Int>
}
const testScalars: __operation<
  'query',
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
const testNullability: __operation<
  'query',
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
const testNesting: __operation<
  'query',
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
const testUnion: __operation<
  'query',
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
const testMethods: __operation<
  'query',
  {
    reqParam: String
    optParam: Float
    input: Nullable<InputType>
    list2: ReadonlyArray<CustomScalar>
  },
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
const testScalarsMutation: __operation<
  'mutation',
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
  mutation testScalarsMutation {
    scalarString
    scalarInt
    scalarFloat
    scalarBoolean
    scalarID
    scalarCustom
    renamedString: scalarString
  }
`
const testNullabilityMutation: __operation<
  'mutation',
  {},
  {
    nullableBoolean: Nullable<Boolean>
    nonNullableBoolean: Boolean
  }
> = gql`
  mutation testNullabilityMutation {
    nullableBoolean
    nonNullableBoolean
  }
`
const testNestingMutation: __operation<
  'mutation',
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
  mutation testNestingMutation {
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
const testMethodsMutation: __operation<
  'mutation',
  {
    reqParam: String
    optParam: Float
    input: Nullable<InputType>
    list2: ReadonlyArray<CustomScalar>
  },
  {
    method: Nullable<CustomScalar>
    renamedMethod: Nullable<ReadonlyArray<Nullable<CustomScalar>>>
  }
> = gql`
  mutation testMethodsMutation(
    $reqParam: String!
    $optParam: Float!
    $input: InputType
    $list2: [CustomScalar!]!
  ) {
    method(requiredParam: $reqParam, optionalParam: $optParam, input: $input)
    renamedMethod: method2(list2: $list2)
  }
`
type __operation<Kind, Data, Variables> = any
type Nullable<T> = T | null
