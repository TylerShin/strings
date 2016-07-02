import React from 'react';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { openTagList } from './actions';

const Navbar = ({ currentUser, dispatch }) => {
  function openMenu() {
    dispatch(openTagList());
  }

  let rightMenu;
  if (currentUser.get('user').isEmpty()) {
    rightMenu = (
      <Link to="signin">
        <i className="fa fa-key fa-lg" />
      </Link>
    );
  } else {
    rightMenu = (
      <span onClick={openMenu}>
        <i className="fa fa-th-large fa-lg" />
      </span>
    );
  }
  return (
    <div className="navbar-component">
      <div className="navbar-leftmenu-wrapper">
        <i className="fa fa-user fa-lg" />
      </div>
      <div className="navbar-logo">
        <i className="fa fa-long-arrow-down fa-lg" />
        <span className="navbar-logo-title">STRINGS</span>
      </div>
      <div className="navbar-rightmenu-wrapper">
        {rightMenu}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  currentUser: ImmutablePropTypes.map.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

export default Navbar;
