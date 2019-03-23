import gql from 'graphql-tag'
type __typed_query<D, V> = any
type __typed_mutation<D, V> = any
type __typed_subscription<D, V> = any
const getCountryName: __typed_query<any, any> = gql`
  query getCountryName {
    getLocation(ip: "144.208.197.25") {
      country {
        names {
          de
        }
      }
    }
  }
`
