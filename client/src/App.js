import React, { Component } from "react";
import "./App.css";
import { mutation, Connect, query } from "urql";
import { addUser, getUserQuery } from './queries/queries';
import Header from "./components/Header";
import RestaurantList from "./components/RestaurantList"
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
    user: {},
    userId: 0
  };

  checkAuth = () => {
    this.setState({loading: true})
    return firebase.auth().getRedirectResult()
    .then(result => {
      if (result.credential) {
        var token = result.credential.accessToken;
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
        let tempUser = {id: currentUser.id, username: currentUser.displayName, email: currentUser.email, img: currentUser.photoURL}
        this.setState({user: tempUser})
        this.setState({loggedIn: true})
        client.executeQuery(query(addUser, {username: currentUser.displayName, email: currentUser.email, img: currentUser.photoURL, favorites: [], votes: []}))
      } else {
        console.log("not authorized");
      }
    })
    this.setState({user: window.localStorage.currentUser});
  }
  loginWithGoogle = () => {
    firebase.auth().signInWithRedirect(provider);
  }
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
        <Connect mutation={{addUser: mutation(addUser)}} query={query(getUserQuery, {email: this.state.user.email})}>
          {({loaded, fetching, refetch, data, error, addUser, query }) => {
            return (
              <React.Fragment>
                <Header data={data} loading={this.state.loading} signOut={this.signOut} loginWithGoogle={this.loginWithGoogle} loggedIn={this.state.loggedIn}/>
                <RestaurantList data={data} user={this.state.user} loggedIn={this.state.loggedIn} />
              </React.Fragment>
            )
          }}
        </Connect>
      </Provider>
    );
  }
}

export default App;
