import typedGraphQL from './outputs/output'
import { createClient } from '@bearbytes/graphql-axios'

async function tryAxios() {
  const client = createClient(typedGraphQL, { url: '' })

  const response = await client.query('testMethods', {
    variables: {
      reqParam: 'stringy boy',
      optParam: 23,
      list2: ['hello', 'world'],
      input: null,
    },
  })
}
