import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function Navbar(props) {

    const { onLogoutClick } = props;

    return (
        <nav>
          <img className="logo grow" src="img/huttstone_logo.png" alt="Hutt Stone" />
          <button className="logout-button bl-base" onClick={onLogoutClick}>Logout</button>
          <Link className="about-link bl-base" to={'/about'}>About / Credits</Link>
        </nav>
  );
};

const propTypes = {
  onLogoutClick: PropTypes.func,
};
Navbar.propTypes = propTypes;

export default Navbar;
