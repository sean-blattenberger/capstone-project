import React from 'react';
import { CollectionItem } from 'react-materialize';
import { Link } from 'react-router-dom';

class Restaurant extends React.Component {
  displayRestaurant = () => {
    console.log(this.props);
    if (this.props.r) {
      return
    }
  }
  render() {
    return (
      <CollectionItem className="avatar">
        <img src={this.props.dummyLinks[this.props.i].img} alt="" className="circle responsive-img" />
        <Link to={{
          pathname: `/restaurants/${this.props.r.id}`,
          state: {
            // refetch: this.props.refetch,
            restaurant: this.props.r
          }
        }}>
          <span className="title">{this.props.r.name}</span>
        </Link>
        <p>Category: {this.props.r.category}, Location: {this.props.r.location}</p>
        <a target="_blank" className="secondary-content" href={this.props.dummyLinks[this.props.i].link}><i className="material-icons light-blue-text text-lighten-3">web</i></a>
      </CollectionItem>
    )
  }
}

export default Restaurant;