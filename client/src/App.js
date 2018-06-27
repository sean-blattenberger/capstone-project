import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import './App.css';
import Header from './components/Header';
import RestaurantList from './components/RestaurantList';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})
class App extends Component {
  state = {
  };
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <Header />
          <RestaurantList/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
