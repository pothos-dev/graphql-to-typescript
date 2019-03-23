import { loadSchema } from '../graphql/Schema'
import { transformSchema } from '../transform/SchemaIR'

test('parse schema', async () => {
  const schema = await loadSchema('src/test/schema.gql')
  expect(schema).toMatchSnapshot('Schema')

  const schemaIR = transformSchema(schema)
  expect(schemaIR).toMatchSnapshot('SchemaIR')
})
