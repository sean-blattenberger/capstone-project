import { gql } from 'apollo-boost';

const getRestaurantsQuery = gql`
  {
    restaurants {
      id
      name
      category
      location
      menuItems {
        food
        type
        desc
        votes
        id
      }
    }
  }
`


export { getRestaurantsQuery }