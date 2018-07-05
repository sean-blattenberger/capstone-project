import React from 'react';
import { Row, Col, Card, Collection, CollectionItem } from "react-materialize";
import Header from "./Header";
class Profile extends React.Component {
  state = {}
  render() {
    return (
      <React.Fragment>
        <Header loggedIn={this.props.location.state.loggedIn} data={this.props.location.state.data}/>
        <Row>
          <Col offset="m3" m={5} s={12}>
            <Card className='profile' textClassName='light-blue-text' title={<div className="right">{this.props.location.state.user.username}</div>} >
              <Row>
                <img height="64px" className="circle" src={this.props.location.state.user.img}/><br/>
                <p style={{"text-transform": "uppercase"}} className="right">
                  {this.props.location.state.user.email}
                </p>
              </Row>
              <Row>
                <Collection header="Saved Items">
                  <CollectionItem className="avatar">Wings @ Will Call</CollectionItem>
                  <CollectionItem className="avatar">Pesto Gnocchi @ Panzano</CollectionItem>
                  <CollectionItem className="avatar">Johnny Burger @ My Brothers Bar</CollectionItem>
                  <CollectionItem className="avatar">Fulfilled Breakfast Burrito @ Just Be Kitchen</CollectionItem>
                </Collection>
              </Row>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
     )
  }
}

export default Profile;