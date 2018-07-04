import React, { Component } from 'react';
import { Collection } from 'react-materialize';
import '../App.css';
import Restaurant from './Resaurant';
import  { getRestaurantsQuery } from '../queries/queries';
import { query, Connect } from 'urql';

const dummyLinks = [
  {
    img: 'http://willcalldenver.com/userfiles/645/images/will-call-header-logo.png',
    link: 'http://willcalldenver.com/index.html'
  },
  {
    img: 'https://fatsullys.com/wp-content/uploads/2018/01/FS_Horiz_2Color_PMS_KnockedType-27px-600x594.png',
    link: 'https://fatsullys.com/'
  },
  {
    img: 'http://loschingonesmexican.com/wp-content/uploads/2014/12/Los-Chingones-Logo.png',
    link: 'https://loschingonesmexican.com/'
  }
]

class RestaurantList extends Component {
  state = {
    restaurants: []
  }
  displayRestaurants = (fetching, data) => {
    if (data == null) {
      return (<div>Loading restaurants...</div>)
    }
    else {
      return data.restaurants.map((r, i) => {
        return (
          <Restaurant data={this.props.data} user={this.props.user} loggedIn={this.props.loggedIn} key={i} i={i} r={r} dummyLinks={dummyLinks}/>
        )
      })
    }
  }
  render() {
    return (
      <Connect query={query(getRestaurantsQuery)}>
        {({ loaded, fetching, refetch, data, error }) => {
          return (
            <div className="container">
              <Collection className="z-depth-2">
                {this.displayRestaurants(fetching, data)}
              </Collection>
            </div>
          )
        }}
      </Connect>
    );
  }
}

export default RestaurantList;