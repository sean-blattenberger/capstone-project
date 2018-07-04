import { Provider, Client } from 'urql';


export const client = new Client({
  url: 'http://localhost:4000/graphql'
})

export {Provider};