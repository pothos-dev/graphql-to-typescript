import program from 'commander'
import generate from '@bearbytes/graphql-client-types'

program.version('0.0.0')

program
  .option(
    '-s, --schema <uri>',
    'Schema file, Introspection JSON file or GraphQL Endpoint'
  )
  .option(
    '-d, --documents <file>',
    'Document file (Queries, Mutations, Subscriptions, Fragments)'
  )
  .option('-o, --outfile <file>', 'Path of the generated file')
  .parse(process.argv)

main()

async function main() {
  try {
    await generate({
      schema: program.schema,
      document: program.documents,
      outFile: program.outfile,
    })
  } catch (error) {
    console.error(error.message)
  }
}
