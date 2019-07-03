#!/usr/bin/env node
import program from 'commander'
import generate from '.'
import { getGraphQLProjectConfig, GraphQLProjectConfig } from 'graphql-config'
import { readFileSync } from 'fs'
import { join } from 'path'
import glob from 'glob'

runCommander()

let configFile: GraphQLProjectConfig | undefined
try {
  configFile = getGraphQLProjectConfig()
} catch (e) {
  // ignore
}

main()
async function main() {
  try {
    const schema = getSchema()
    const headers = getHeaders()
    const documents = getDocuments()
    const outFile = getOutfile()

    await generate({
      schema,
      headers,
      documents,
      outFile,
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

function getSchema(): string {
  if (program.schema) {
    return program.schema
  }

  if (!configFile) {
    throw exit('No schema given (-s <uri>), also no GraphQL config file found.')
  }

  if (configFile.schemaPath) {
    return configFile.schemaPath
  }

  const url = getUrlFromEndpoints()
  if (url) {
    return url
  }

  throw exit(
    'No schema given (-s <uri>), and could not find schemaPath or an endpoint url in GraphQL config file.'
  )

  function getUrlFromEndpoints(): string | null {
    const endpoints = configFile!.extensions.endpoints
    if (!endpoints) return null

    const names = Object.keys(endpoints)
    if (names.length == 0) {
      return null
    }

    if (names.length > 1) {
      // todo how to select the correct endpoint?
      throw exit(
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

function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {}
  if (program.headers) {
    for (const part of program.headers.split(',')) {
      const [key, value] = part.trim().split('=')
      headers[key] = value
    }
  }
  return headers
}

function getDocuments(): string[] {
  if (program.documents) return globify(program.documents.split(','))

  if (!configFile) {
    throw exit(
      'No documents given (-d <file>), also no GraphQL config file found.'
    )
  }

  return globify(configFile.includes)

  function globify(globs: string[]): string[] {
    const files = globs
      .map((pattern) => glob.sync(pattern))
      .reduce((acc, it) => acc.concat(it), [])

    if (files.length == 0) {
      throw exit(
        'No documents given (-d <file>), and glob patterns in GraphQL config file did not match any files.'
      )
    }

    return files
  }
}

function getOutfile(): string {
  if (program.outFile) return program.outFile

  if (!configFile) {
    throw exit(
      'No outFile given (-o <file>), also no GraphQL config file found.'
    )
  }

  const config = configFile.extensions['@bearbytes/graphql-to-typescript']
  if (config && config.outFile) return config.outFile

  throw exit(
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
      '-h, --headers <list>',
      'List of HTTP headers (key=value) separated by comma sent with the introspection request'
    )
    .option(
      '-d, --documents <file>',
      'Document file (Queries, Mutations, Subscriptions, Fragments)'
    )
    .option('-o, --outFile <file>', 'Path of the generated file')
    .parse(process.argv)
}

function exit(message: string) {
  console.error(message)
  process.exit(1)
}
