import React from "react";
import { Navbar, Button } from "react-materialize";
import Spinner from 'react-spinner-material';
import { Link } from 'react-router-dom';

const Header = props => (
  <React.Fragment>
    <div className="navbar-fixed">
      <Navbar className="blue-grey darken-3" brand={<div className=" light-blue-text text-lighten-3 logo thin">🍽 MenuSortr</div>} right>
      {props.data && props.data.user && props.loggedIn ?
            <Button className="light-blue lighten-3 z-depth-1"><Link to={{pathname: `/profile/${props.data.user.id}`, state: {user: props.data.user, data: props.data, loggedIn: props.loggedIn}}}>Profile</Link></Button>

          : ''
      }
      { props.loading ? <Spinner/>:
        props && <Button onClick={(e) => { props.loggedIn ? props.signOut() : props.loginWithGoogle(); }} className="light-blue lighten-3 z-depth-1">
          { props.loggedIn ? 'Logout':
            <img alt="google login" height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/googleplus.svg" />
          }
        </Button> }
      </Navbar>
    </div>
  </React.Fragment>
);

export default Header;
