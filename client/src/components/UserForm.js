import React from "react";
import { Row, Input, Icon, Button, Col } from "react-materialize";
import firebase from "firebase";

class UserForm extends React.Component {
  state = {
    userName: this.props.userName,
    password: this.props.password
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  submitForm = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.state.userName,
        this.state.password
      )
      .catch(function (error) {
        if(error) console.log('Error: ', error.code, error.message);
      });
    this.setState({ showForm: false });
  }
  render() {
    return (
      <Row>
        <Col s={3} offset="s9">
          <Row>
            <Input
              onChange={this.handleChange}
              s={12}
              value={this.props.userName}
              name="userName"
              label="User Name"
              validate
            >
              <Icon>account_circle</Icon>
            </Input>
          </Row>
          <Row>
            <Input
              onChange={this.handleChange}
              s={12}
              value={this.props.password}
              name="password"
              label="Password"
              validate
              type="password"
            >
              <Icon>lock</Icon>
            </Input>
          </Row>
          <Button
            onClick={this.submitForm}
            className="light-blue darken-2"
          >
            Submit
          </Button>
        </Col>
      </Row>
    );
  }
}

export default UserForm;
