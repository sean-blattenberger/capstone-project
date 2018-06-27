import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import { Collection, CollectionItem } from 'react-materialize';
import Header from './Header';
import { log } from 'util';


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
        <Collection className="blue-grey-text text-darken-2" header={restaurant.name}>
          {
            restaurant.menuItems.map((item, i) => {
              return (
                <CollectionItem key={i} className="avatar menu-item blue-grey-text text-darken-2">
                  <span className="collection-left">
                    <i className="material-icons">arrow_upward</i>
                    <p className="vote-count">3</p>
                    <i className="material-icons">arrow_downward</i>
                  </span>
                  <span className="title bold">{item.food.toUpperCase()}</span>
                  <p>{item.desc}</p>
                  <a onClick={(e) => {
                    Array.from(e.target.classList).includes('green-text')
                      ?
                      e.target.classList.remove('green-text')
                      :
                      e.target.classList.add('green-text')
                  }} className="secondary-content grey-text favorite"><i className="material-icons">grade</i></a>
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
