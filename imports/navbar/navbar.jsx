import React from 'react';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';

const Navbar = ({ currentUser }) => {
  let rightMenu;
  if (currentUser.get('user').isEmpty()) {
    rightMenu = (
      <Link to="signin">로그인</Link>
    );
  } else {
    rightMenu = (
      <span>서랍</span>
    );
  }
  return (
    <div className="navbar-component">
      <div className="navbar-leftmenu-wrapper">
        User
      </div>
      <div className="navbar-logo">
        Strings
      </div>
      <div className="navbar-rightmenu-wrapper">
        {rightMenu}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  currentUser: ImmutablePropTypes.map.isRequired,
};

export default Navbar;
