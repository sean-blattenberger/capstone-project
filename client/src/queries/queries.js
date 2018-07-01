const getRestaurantsQuery = `
  query {
    restaurants {
      id
      name
      category
      location
      menuItems {
        id
        food
        type
        desc
        votes
      }
    }
  }
`
const updateVotes = `
  mutation($votes: Int!, $id: ID!) {
    updateVotes(votes: $votes, id: $id) {
      votes
    }
  }
`

export { getRestaurantsQuery, updateVotes }