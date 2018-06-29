import React, { Component } from 'react';
import { Collection } from 'react-materialize';
import '../App.css';
import Restaurant from './Resaurant';
import { graphql } from 'react-apollo';
import  { getRestaurantsQuery } from '../queries/queries'
import Button from 'react-materialize/lib/Button';

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
  displayRestaurants = () => {
    if (this.props.data.loading) {
      return (<div>Loading restaurants...</div>)
    }
    else {
      return this.props.data.restaurants.map((r, i) => {
        return (
          <Restaurant key={i} i={i} r={r} refetch={this.props.data ? this.props.data.refetch: null} dummyLinks={dummyLinks}/>
        )
      })
    }
  }
  render() {
    return (
      <div className="container">
        <Collection className="z-depth-2">
          {this.displayRestaurants()}
        </Collection>
        <Button onClick={this.props.refetch}>Click</Button>
      </div>
    );
  }
}

export default graphql(getRestaurantsQuery)(RestaurantList);