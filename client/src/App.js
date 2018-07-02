import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import RestaurantList from "./components/RestaurantList";
import { client, Provider } from "./queries/client";
import firebase from "firebase";
const provider = new firebase.auth.GoogleAuthProvider();

const config = {
  apiKey: "AIzaSyAYSpM6Cjv4hE5EuM5ZkQQLrTBLzf9sGP4",
  authDomain: "menu-sort.firebaseapp.com",
  databaseURL: "https://menu-sort.firebaseio.com",
  projectId: "menu-sort",
  storageBucket: "menu-sort.appspot.com",
  messagingSenderId: "239322719822"
};
firebase.initializeApp(config);
let fbAuth = firebase.auth()

firebase.auth().getRedirectResult().then(function (result) {
  if (result.credential) {
    var token = result.credential.accessToken;
    console.log(token);
  }
  var user = result.user;
}).catch(function (error) {
  console.log("Error: ", error.code, error.message, error.email, error.credential);
});


class App extends Component {
  state = {
    loggedIn: false,
    user: {}
  };
  componentDidMount() {
    fbAuth.onAuthStateChanged(currentUser => {
      console.log(this);
      if (currentUser) {
        window.localStorage.setItem('currentUser', currentUser)
        this.setState({user: window.localStorage.currentUser})
        this.setState({loggedIn: true})
      } else {
        console.log("not authorized");
      }
    })
    console.log(window.localStorage.currentUser);
    this.setState({user: window.localStorage.currentUser});
  }
  loginWithGoogle = () => {
    firebase.auth().signInWithRedirect(provider);
  };
  signOut = () => {
    firebase.auth().signOut().then(function () {
      console.log("success")
    }).catch(function (error) {
      console.log(error);
    });
  }
  render() {
    return (
      <Provider client={client}>
        <React.Fragment>
          <Header signOut={this.signOut} loginWithGoogle={this.loginWithGoogle} loggedIn={this.state.loggedIn}/>
          <RestaurantList />
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
