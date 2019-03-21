import { parseFromUrl } from './graphql'
import transformSchema from './transform'

parseFromUrl('httpss://countries.trevorblades.com/')
  .then(transformSchema)
  .then(console.log)
