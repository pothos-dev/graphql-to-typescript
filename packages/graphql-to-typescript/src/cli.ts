#!/usr/bin/env node
import program from 'commander'
import generate from '.'
import {
  loadConfigSync,
  GraphQLConfig,
  GraphQLProjectConfig,
} from 'graphql-config'
import { readFileSync } from 'fs'
import { join } from 'path'
import glob from 'glob'
import { GraphQLSchema } from 'graphql'

runCommander()

let config: GraphQLConfig | undefined
let projectConfig: GraphQLProjectConfig | undefined
try {
  config = loadConfigSync({})
  projectConfig = config?.getDefault()
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

function getSchema(): GraphQLSchema | string {
  // Take schema string from CLI if provided
  if (program.schema) {
    return program.schema
  }

  // Otherwise take from config file
  if (projectConfig) {
    return projectConfig.getSchemaSync()
  }

  // Otherwise fail
  throw exit('No schema given (-s <uri>), also no GraphQL config file found.')
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
  // Take documents from CLI if provided
  if (program.documents) {
    return globify(program.documents.split(','))
  }

  // Otherwise take from config file
  if (projectConfig) {
    return projectConfig
      .getDocumentsSync()
      .map((source) => source.location)
      .filter((location) => location != null)
      .map((location) => location as string)
  }

  // Otherwise fail
  throw exit(
    'No documents given (-d <file>), also no GraphQL config file found.'
  )
}

function getOutfile(): string {
  if (program.outFile) {
    return program.outFile
  }

  if (projectConfig) {
    const extensionConfig =
      projectConfig.extensions['@bearbytes/graphql-to-typescript']

    if (extensionConfig && extensionConfig.outFile) {
      return extensionConfig.outFile
    }
  }

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
