import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collection, CollectionItem } from 'react-materialize';
import '../App.css';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getRestaurantsQuery = gql`
  {
    restaurants {
      id
      name
      category
      location
      menuItems {
        food
        type
        desc
        votes
      }
    }
  }
`
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
      // this.setState({restaurants: this.props.data.restaurants})
      return this.props.data.restaurants.map((r, i) => {
        return (
          <CollectionItem className="avatar" key={i}>
            <img src={dummyLinks[i].img} alt="" className="circle responsive-img" />
            <Link to={{
              pathname: `/restaurants/${r.id}`,
              state: {
                restaurant: r
              }
            }}>
              <span className="title">{r.name}</span>
            </Link>
            <p>Category: {r.category}, Location: {r.location}</p>
            <a target="_blank" className="secondary-content" href={dummyLinks[i].link}><i className="material-icons light-blue-text text-lighten-3">web</i></a>
          </CollectionItem>
        )
      })
    }
  }
  render() {
    console.log(this.props);
    return (
      <div className="container">
        <Collection className="z-depth-2">
          {this.displayRestaurants()}
        </Collection>
      </div>
    );
  }
}

export default graphql(getRestaurantsQuery)(RestaurantList);