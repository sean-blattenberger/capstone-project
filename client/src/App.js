import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import RestaurantList from "./components/RestaurantList";
import { client, Provider } from "./queries/client";
import { Row, Input, Icon, Button } from "react-materialize";

class App extends Component {
  state = {
    showForm: false,
    userName: '',
    password: ''
  };
  renderForm = () => {
    this.state.showForm
      ? this.setState({ showForm: false })
      : this.setState({ showForm: true });
  };
  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }
  render() {
    return (
      <Provider client={client}>
        <React.Fragment>
          <Header renderForm={this.renderForm} />
          <RestaurantList />
          {this.state.showForm ? (
            <Row>
              <Input onChange={this.handleChange} s={6} value={this.state.userName} name="userName" label="User Name" validate>
                <Icon>account_circle</Icon>
              </Input>
              <Input onChange={this.handleChange} s={6} value={this.state.password} name="password" label="Password" validate type="tel">
                <Icon>lock</Icon>
              </Input>
              <Button onClick={() => {console.log("submit registration")}} className="light-blue darken-2">Submit</Button>
            </Row>
          ) : (
            ""
          )}
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
