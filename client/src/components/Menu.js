import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import { Collection, CollectionItem } from 'react-materialize';
import Header from './Header';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})
class Menu extends Component {
  state = {
  };
  displayData = () => {
    if (!this.props.location.state) {
      return (<div>Loading Data...</div>)
    }
    else {
      let restaurant = this.props.location.state.restaurant;
      return (
        <Collection header={restaurant.name}>
          {
            restaurant.menuItems.map((item, i) => {
              return (
                <CollectionItem key={i} className="avatar">
                  <span className="collection-left">
                    <i className="material-icons">arrow_upward</i>
                    <p>3</p>
                    <i className="material-icons">arrow_downward</i>
                  </span>
                  {item.food}
                </CollectionItem>
              );
            })
          }
        </Collection>
      )
    }
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <React.Fragment>
          <Header/>
          <div className="container">
            {this.displayData()}
          </div>
        </React.Fragment>
      </ApolloProvider>
    );
  }
}

export default Menu;
