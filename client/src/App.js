import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import RestaurantList from './components/RestaurantList';
import { client, Provider } from './queries/client';

class App extends Component {
  state = {
  };
  render() {
    return (
      <Provider client={client}>
        <React.Fragment>
          <Header />
          <RestaurantList/>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
