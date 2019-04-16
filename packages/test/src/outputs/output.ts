// This file is generated by a tool. All changes will be overwritten.
import { Operation } from '@bearbytes/graphql-to-typescript'

// Scalar Types
export type String = string
export type Int = number
export type Float = number
export type Boolean = boolean
export type ID = string
export type CustomScalar = string

// Fragment Types
export type ObjectTypeFields = {
  __typename: 'ObjectType'
  scalar: Nullable<Boolean>
}

// Input Types
export interface InputType {
  recursive: Nullable<InputType>
  nested: Nullable<NestedInputType>
  scalar: Nullable<Boolean>
  list: Nullable<ReadonlyArray<String>>
}
export interface NestedInputType {
  scalar: Nullable<Int>
}

// Operations
export default {
  simpleQuery: `query simpleQuery {\n  scalarString\n}` as Operation<
    'query',
    {},
    {
      scalarString: Nullable<String>
    }
  >,
  testScalars: `query testScalars {\n  scalarString\n  scalarInt\n  scalarFloat\n  scalarBoolean\n  scalarID\n  scalarCustom\n\n  renamedString: scalarString\n}` as Operation<
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
  >,
  testNullability: `query testNullability {\n  nullableBoolean\n  nonNullableBoolean\n}` as Operation<
    'query',
    {},
    {
      nullableBoolean: Nullable<Boolean>
      nonNullableBoolean: Boolean
    }
  >,
  testNesting: `query testNesting {\n  nestedObject {\n    recursive {\n      recursive {\n        scalar\n      }\n    }\n    nested {\n      scalar\n    }\n    scalar\n    list\n  }\n}` as Operation<
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
  >,
  testUnion: `query testUnion {\n  union {\n    ... on Tomato {\n      id\n      color\n    }\n    ... on Potato {\n      id\n      origin\n    }\n  }\n}` as Operation<
    'query',
    {},
    {
      union: Nullable<
        | ({
            __typename: 'Tomato'
            id: Nullable<ID>
            color: Nullable<String>
          })
        | ({
            __typename: 'Potato'
            id: Nullable<ID>
            origin: Nullable<String>
          })
      >
    }
  >,
  testMethods: `query testMethods(\n  $reqParam: String!\n  $optParam: Float!\n  $input: InputType\n  $list2: [CustomScalar!]!\n) {\n  method(requiredParam: $reqParam, optionalParam: $optParam, input: $input)\n  renamedMethod: method2(list2: $list2)\n}` as Operation<
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
  >,
  testScalarsMutation: `mutation testScalarsMutation {\n  scalarString\n  scalarInt\n  scalarFloat\n  scalarBoolean\n  scalarID\n  scalarCustom\n\n  renamedString: scalarString\n}` as Operation<
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
  >,
  testNullabilityMutation: `mutation testNullabilityMutation {\n  nullableBoolean\n  nonNullableBoolean\n}` as Operation<
    'mutation',
    {},
    {
      nullableBoolean: Nullable<Boolean>
      nonNullableBoolean: Boolean
    }
  >,
  testNestingMutation: `mutation testNestingMutation {\n  nestedObject {\n    recursive {\n      recursive {\n        scalar\n      }\n    }\n    nested {\n      scalar\n    }\n    scalar\n    list\n  }\n}` as Operation<
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
  >,
  testMethodsMutation: `mutation testMethodsMutation(\n  $reqParam: String!\n  $optParam: Float!\n  $input: InputType\n  $list2: [CustomScalar!]!\n) {\n  method(requiredParam: $reqParam, optionalParam: $optParam, input: $input)\n  renamedMethod: method2(list2: $list2)\n}` as Operation<
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
  >,
  testFragments: `query testFragments {\n  nestedObject {\n    ...ObjectTypeFields\n  }\n}` as Operation<
    'query',
    {},
    {
      nestedObject: Nullable<ObjectTypeFields & {}>
    }
  >,
}

// Helper types
export type Nullable<T> = T | null
