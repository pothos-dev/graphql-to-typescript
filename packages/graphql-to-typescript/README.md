# graphql-to-typescript

This is a compiler that takes a GraphQL Schema and one or more GraphQL Document files (containing client-side queries, mutations or subscriptions), and generates a Typescript file with type information about these documents, that can be consumed by other tools, such as [typed-apollo-client](TODO).

## Example Usage

Consider this simple schema:

```graphql
type Query {
  users: [User!]!
  userById(id: ID!): User
}

type User {
  id: ID!
  name: String!
  photoUrl: String
}
```

Usually, we'll write our operations in GraphiQL or GraphQL Playground, and then copy them into a `.gql` file in our client code. In this example, we're creating two queries and a Fragment definition, which makes it easier to make sure that we're getting the same fields in both cases.

```graphql
# my-operations.gql

fragment UserInfo on User {
  id
  name
}

query getAllUsers {
  users {
    ...UserInfo
  }
}

query getUserById($userId: ID!) {
  userById(id: $userId) {
    ...UserInfo
    photoUrl
  }
}
```

Now we run the compiler:

```bash
npx graphql-to-typescript           \
  --schema my-endpoint              \
  --documents src/**/*.gql          \
  --outFile src/graphql-operations.ts
```

The generated file `graphql-operations.ts` will export

- An object containing all the operations as default export
- The `UserInfo` interface

The default export can be passed directly into [typed-apollo-client](TODO), or it can be used to extract type information about the operations using some helper types:

```typescript
import {
  OperationVariables,
  OperationData,
} from '@bearbytes/graphql-to-typescript'
import GraphQLOperations, { UserInfo } from './graphql-operations' // generated file

type T = typeof GraphQLOperations

// const queryString = `
//    query getUserById($userId: ID!) {
//      userById(id: $userId) {
//        ...UserInfo
//        photoUrl
//      }
//    }
//    fragment UserInfo on User {
//      id
//      name
//    }
// `
const queryString = GraphQLOperations['getUserById']

// type SomeVars = {
//   userId: string
// }
type SomeVars = OperationVariables<T, 'getUserById'>

// type SomeData = {
//   userById: null | (UserInfo & { photoUrl: null | string })
// }
type SomeData = OperationData<T, 'getUserById'>
```
