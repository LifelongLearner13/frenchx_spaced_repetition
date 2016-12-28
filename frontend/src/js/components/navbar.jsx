import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function Navbar(props) {

    const { onLogoutClick } = props;

    return (
        <nav>
          <h1>
            <img className="nav-logo" src="img/huttstone_logo.png" alt="Hutt Stone" />
          </h1>
          <div className="link-area">
            <button className="logout-button bl-base" onClick={onLogoutClick}>Logout</button>
            <Link className="about-link bl-base" to={'/about'}>About / Credits</Link>
          </div>
        </nav>
  );
};

const propTypes = {
  onLogoutClick: PropTypes.func,
};
Navbar.propTypes = propTypes;
