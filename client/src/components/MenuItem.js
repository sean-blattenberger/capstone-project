import React from "react";
import { CollectionItem } from "react-materialize";
import { mutation, query, Connect } from "urql";
import { getRestaurantsQuery, updateVotes } from "../queries/queries";

class MenuItem extends React.Component {
  state = {
    votes: 0
  };
  componentDidMount() {
    if (this.props.item) {
      this.setState({ votes: this.props.item.votes });
    }
  }
  render() {
    return (
      <Connect
        query={query(getRestaurantsQuery)}
        mutation={{ updateVotes: mutation(updateVotes) }}
      >
        {({ loaded, fetching, refetch, data, error, updateVotes }) => {
          const updateVotesAndRefetch = (votes, e, color) => {
            updateVotes({ votes, id: this.props.item.id });
            this.setState({ votes: votes });
            if (Array.from(e.target.classList).includes(`${color}-text`)) {
              e.target.classList.remove(`${color}-text`);
              e.target.classList.add("blue-grey-text");
              e.target.classList.add("text-darken-2");
            } else {
              e.target.classList.add(`${color}-text`);
              e.target.classList.remove("blue-grey-text");
              e.target.classList.remove("text-darken-2");
            }
          };
          return (
            <CollectionItem className="avatar menu-item blue-grey-text text-darken-2">
              <span className="collection-left">
                <i
                  onClick={e =>
                    updateVotesAndRefetch(this.props.item.votes + 1, e, "green")
                  }
                  value={this.props.item.votes}
                  className="material-icons vote blue-grey-text text-darken-2"
                >
                  thumb_up
                </i>
                <p className="vote-count">{this.state.votes}</p>
                <i
                  onClick={e =>
                    updateVotesAndRefetch(this.props.item.votes - 1, e, "red")
                  }
                  value={this.props.item}
                  className="material-icons vote blue-grey-text text-darken-2"
                >
                  thumb_down
                </i>
              </span>
              <span className="title bold">
                {this.props.item.food.toUpperCase()}
              </span>
              <p className="desc">{this.props.item.desc}</p>
              <a
                onClick={e => {
                  Array.from(e.target.classList).includes("green-text")
                    ? e.target.classList.remove("green-text")
                    : e.target.classList.add("green-text");
                }}
                className="secondary-content grey-text favorite"
              >
                <i className="material-icons">grade</i>
              </a>
            </CollectionItem>
          );
        }}
      </Connect>
    );
  }
}
export default MenuItem;
