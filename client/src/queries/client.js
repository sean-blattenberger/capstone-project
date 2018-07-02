import { Provider, Client } from 'urql';


export const client = new Client({
  url: 'https://menu-sort.herokuapp.com/graphql'
})

export {Provider};