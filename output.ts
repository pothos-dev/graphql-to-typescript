const getCountryName = gql`
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
