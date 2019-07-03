import axios from 'axios'
import { getIntrospectionQuery, IntrospectionQuery } from 'graphql/utilities'
import { readFile } from 'fs-extra'

export async function loadIntrospection(
  uri: string,
  headers?: Record<string, string>
) {
  try {
    if (uri.startsWith('http')) {
      return loadIntrospectionFromUrl(uri, headers)
    } else {
      return loadIntrospectionFromFile(uri)
    }
  } catch (e) {
    throw {
      message: `Error loading IntrospectionQuery from ${uri}: ${e.message}`,
    }
  }
}

export async function loadIntrospectionFromUrl(
  url: string,
  headers?: Record<string, string>
): Promise<IntrospectionQuery> {
  const query = getIntrospectionQuery({ descriptions: false })
  const response = await axios.post(url, { query }, { headers })
  return response.data.data as IntrospectionQuery
}

export async function loadIntrospectionFromFile(
  filePath: string
): Promise<IntrospectionQuery> {
  const fileContent = await readFile(filePath, { encoding: 'utf8' })
  return JSON.parse(fileContent) as IntrospectionQuery
}
