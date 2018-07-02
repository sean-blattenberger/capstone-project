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


class App extends Component {
  state = {
    loggedIn: false,
    user: {}
  };

  checkAuth = () => {
    this.setState({loading: true})
    return firebase.auth().getRedirectResult()
    .then(result => {
      if (result.credential) {
        var token = result.credential.accessToken;
        console.log(token);
      }
      var user = result.user;
      this.setState({loading: false})
      return user
    }).catch(function (error) {
      console.error("Error: ", error.code, error.message, error.email, error.credential);
    });

  }
  componentDidMount() {
    this.checkAuth()
    fbAuth.onAuthStateChanged(currentUser => {
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
    console.time('loginWithGoogle')
    firebase.auth().signInWithRedirect(provider)
    .then((authData) => {
      console.timeEnd('loginWithGoogle')
      console.log('AuthData', authData)
      this.setState({loggedIn: true})
    });
  };
  signOut = () => {
    firebase.auth().signOut().then(() => {
      console.log("success")
      this.setState({loggedIn: false})
    }).catch(function (error) {
      console.log(error);
    });
  }
  render() {
    return (
      <Provider client={client}>
        <React.Fragment>
          <Header loading={this.state.loading} signOut={this.signOut} loginWithGoogle={this.loginWithGoogle} loggedIn={this.state.loggedIn}/>
          <RestaurantList loggedIn={this.state.loggedIn} />
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
