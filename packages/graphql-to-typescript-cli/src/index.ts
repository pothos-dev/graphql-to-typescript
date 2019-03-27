import program from 'commander'

program.version('0.0.0')

program
  .option(
    '-s, --schema',
    'Schema file, Introspection JSON file or GraphQL Endpoint'
  )
  .option(
    '-o --operations',
    'Operations file (Queries, Mutations, Subscriptions)'
  )
  .parse(process.argv)

console.log('Hello world')
