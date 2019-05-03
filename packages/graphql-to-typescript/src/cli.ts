#!/usr/bin/env node
import program from 'commander'
import generate from '.'
import { getGraphQLProjectConfig } from 'graphql-config'
import { readFileSync } from 'fs'
import { join } from 'path'
import glob from 'glob'

runCommander()
const configFile = getGraphQLProjectConfig()

main()
async function main() {
  try {
    const schema = getSchema()
    const document = getDocuments()
    const outFile = getOutfile()

    await generate({
      schema,
      document,
      outFile,
    })
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}

function getSchema(): string {
  if (program.schema) {
    return program.schema
  }

  if (!configFile) {
    throw Error(
      'No schema given (-s <uri>), also no GraphQL config file found.'
    )
  }

  if (configFile.schemaPath) {
    return configFile.schemaPath
  }

  const url = getUrlFromEndpoints()
  if (url) {
    return url
  }

  throw Error(
    'No schema given (-s <uri>), and could not find schemaPath or an endpoint url in GraphQL config file.'
  )

  function getUrlFromEndpoints(): string | null {
    const endpoints = configFile.extensions.endpoints
    if (!endpoints) return null

    const names = Object.keys(endpoints)
    if (names.length == 0) {
      return null
    }

    if (names.length > 1) {
      // todo how to select the correct endpoint?
      throw Error(
        'No schema given (-s <uri>), and multiple endpoints found in GraphQL config file.'
      )
    }

    const endpoint = endpoints[names[0]]
    if (typeof endpoint == 'string') {
      return endpoint
    }

    // todo: also return headers
    return endpoint.url
  }
}

function getDocuments(): string {
  if (program.documents) return program.documents

  if (!configFile) {
    throw Error(
      'No documents given (-d <file>), also no GraphQL config file found.'
    )
  }

  const includes = configFile.includes
  const files = includes
    .map((pattern) => glob.sync(pattern))
    .reduce((acc, it) => acc.concat(it), [])
  if (files.length == 0) {
    throw Error(
      'No documents given (-d <file>), and glob patterns in GraphQL config file did not match any files.'
    )
  }

  if (files.length > 1) {
    throw Error('NYI: support multiple document files') // todo!
  }

  return files[0]
}

function getOutfile(): string {
  if (program.outFile) return program.outFile

  if (!configFile) {
    throw Error(
      'No outFile given (-o <file>), also no GraphQL config file found.'
    )
  }

  const config = configFile.extensions['@bearbytes/graphql-to-typescript']
  if (config && config.outFile) return config.outFile

  throw Error(
    'No outFile given (-o <file>), and no outfile found in GraphQL config file.'
  )
}

function runCommander() {
  program.version(
    JSON.parse(
      readFileSync(join(__dirname, '../package.json'), { encoding: 'utf8' })
    ).version
  )

  program
    .option(
      '-s, --schema <uri>',
      'Schema file, Introspection JSON file or GraphQL Endpoint'
    )
    .option(
      '-d, --documents <file>',
      'Document file (Queries, Mutations, Subscriptions, Fragments)'
    )
    .option('-o, --outFile <file>', 'Path of the generated file')
    .parse(process.argv)
}
