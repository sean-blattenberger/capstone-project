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
          <Button
            onClick={props.renderForm}
            className="light-blue lighten-3 grey-text text-darken-4 z-depth-1"
          >
            Register
          </Button>
          <Button className="light-blue lighten-3 grey-text text-darken-4 z-depth-1">
            Login
          </Button>
        </Navbar>
      </div>
    </React.Fragment>
  );
};

export default Header;
