import React from 'react';
import { CollectionItem } from 'react-materialize';
import { mutation, query, Connect } from 'urql';
import { log } from 'util';

const getRestaurantsQuery = `
  query {
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
const updateVotes = `
  mutation($votes: Int!, $id: ID!) {
    updateVotes(votes: $votes, id: $id) {
      votes
    }
  }
`
class MenuItem extends React.Component {
  render() {
    return (
      <Connect query={query(getRestaurantsQuery)} mutation={{updateVotes: mutation(updateVotes)}}>
        {({ loaded, fetching, refetch, data, error, updateVotes }) => {
          const updateVotesAndRefetch = (votes) => {
            updateVotes({votes, id: this.props.item.id}).then(() => refetch({ skipCache: true })).then((results) => {
              console.log({data}, {results})
            })
          }
          return (
            <CollectionItem className="avatar menu-item blue-grey-text text-darken-2">
              <span className="collection-left">
                <i onClick={() => updateVotesAndRefetch(this.props.item.votes + 1)} value={this.props.item.votes} className="material-icons vote blue-grey-text text-darken-2">thumb_up</i>
                <p className="vote-count">{this.props.item.votes}</p>
                <i onClick={() => updateVotesAndRefetch(this.props.item.votes - 1)} value={this.props.item} className="material-icons vote blue-grey-text text-darken-2">thumb_down</i>
              </span>
              <span className="title bold">{this.props.item.food.toUpperCase()}</span>
              <p className="desc">{this.props.item.desc}</p>
              <a onClick={(e) => {
                Array.from(e.target.classList).includes('green-text')
                  ?
                  e.target.classList.remove('green-text')
                  :
                  e.target.classList.add('green-text')
              }} className="secondary-content grey-text favorite"><i className="material-icons">grade</i></a>
            </CollectionItem>
            )
          }}
        </Connect>
      )
  }
}
export default MenuItem;