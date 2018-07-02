import React from "react";
import { Navbar, Button } from "react-materialize";

const Header = props => {
  return (
    <React.Fragment>
      <div className="navbar-fixed">
        <Navbar
          className="blue-grey darken-3"
          brand={
            <div className=" light-blue-text text-lighten-3 logo thin">
              🍽 MenuSortr{" "}
            </div>
          }
          right
        >
          <Button onClick={(e) => {
            if (props.loggedIn) {
              props.signOut()
            }
            else {
              props.loginWithGoogle();
            }
          }} className="light-blue lighten-3 z-depth-1">
            {
              props.loggedIn
                ?
                'Logout'
                :
                <img alt="google login" height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/googleplus.svg" />
            }
          </Button>
        </Navbar>
      </div>
    </React.Fragment>
  );
};

export default Header;
