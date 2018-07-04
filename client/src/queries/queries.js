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
const getUserQuery = `
  query($email: String!) {
    user(email: $email) {
      id
      email
      username
      img
      favorites {
        id
      }
      votes {
        id
      }
    }
  }
`
const updateVotes = `
  mutation($votes: Int!, $id: ID!, $userId: ID!) {
    updateVotes(votes: $votes, id: $id, userId: $userId) {
      votes
    }
  }
`
const addUser = `
  mutation($username: String!, $email: String!, $img: String!, $favorites: [MenuInput]!, $votes: [MenuInput]!) {
    addUser(username: $username, email: $email, img: $img, favorites: $favorites, votes: $votes) {
      username
      email
      img
      favorites {
        id
      }
      votes {
        id
      }
    }
  }
`

export { getRestaurantsQuery, updateVotes, addUser, getUserQuery }