import { GraphQLServer } from 'graphql-yoga'
import { readFileSync } from 'fs'
import morgan from 'morgan'

export function startServer() {
  const typeDefs = readFileSync('src/schema.gql', { encoding: 'utf8' })

  const server = new GraphQLServer({
    typeDefs,
    resolvers: {},
    mocks: true,
  })

  server.use(morgan('common'))
  server.use((req: any, res: any, next: any) => {
    console.log(req.body)
    next()
  })

  server.start({ port: 5000 })
}

startServer()
