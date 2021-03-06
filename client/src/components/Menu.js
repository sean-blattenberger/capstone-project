import React, { Component } from "react";
import { Collection } from "react-materialize";
import Header from "./Header";
import MenuItem from "./MenuItem";
import { client, Provider } from "../queries/client";

class Menu extends Component {
  state = {
    menuItems: []
  };
  displayData = () => {
    if (!this.props.location.state) {
      return <div>Loading Data...</div>;
    } else {
      let restaurant = { ...this.props.location.state.restaurant };
      return (
        <Collection className="z-depth-2 thin" header={restaurant.name}>
          {restaurant.menuItems
            .concat([])
            .sort((a, b) => b.votes - a.votes)
            .map((item, i) => {
              return <MenuItem data={this.props.location.state.data} user={this.props.location.state.user} key={i} item={item} />;
            })}
        </Collection>
      );
    }
  };
  render() {
    return (
      <Provider client={client}>
        <React.Fragment>
          <Header data={this.props.location.state.data} loggedIn={this.props.location.state.loggedIn} />
          <div className="container">{this.displayData()}</div>
        </React.Fragment>
      </Provider>
    );
  }
}

export default Menu;
