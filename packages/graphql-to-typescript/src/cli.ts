#!/usr/bin/env node
import program from 'commander'
import generate from '.'

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

if (!program.schema) error('No schema given (-s <uri>)')
if (!program.documents) error('No documents given (-d <file>)')
if (!program.outfile) error('No outfile given (-o <file>')

function error(message: string) {
  console.error(message)
  process.exit(1)
}

main()

async function main() {
  try {
    await generate({
      schema: program.schema,
      document: program.documents,
      outFile: program.outfile,
    })
  } catch (error) {
    console.error(error)
  }
}
