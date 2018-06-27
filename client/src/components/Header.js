import React from 'react';
import { Navbar, Button } from 'react-materialize';

const Header = () => {
  return (
    < Navbar className="blue-grey darken-3" brand={<div className=" light-blue-text text-lighten-3 logo thin">🍽 MenuSortr </div>} right>
      <Button className="light-blue lighten-3 grey-text text-darken-4"> Register </Button>
      <Button className="light-blue lighten-3 grey-text text-darken-4">Login</Button>
    </Navbar>
  );
}

export default Header;