import { GraphQLServer } from 'graphql-yoga'
import { readFileSync } from 'fs'

const typeDefs = readFileSync('src/schema.gql', { encoding: 'utf8' })

const server = new GraphQLServer({
  typeDefs,
  resolvers: {},
  mocks: true,
})

server.start({ port: 5000 })
