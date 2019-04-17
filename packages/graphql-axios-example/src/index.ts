import queries from './queries'
import { createClient } from '@bearbytes/graphql-axios'

const client = createClient(queries, {
  url: 'https://api.graphloc.com/graphql',
})

client
  .query({ operationName: 'getLocationInfo' })
  .then((response) => console.log(JSON.stringify(response)))
