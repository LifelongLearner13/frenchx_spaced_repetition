import React, { PropTypes } from 'react';
import Auth0Lock from 'auth0-lock';
import { Link } from 'react-router';

const SERVER_URL = window.location.origin;

function Navbar(props) {
  
    const { onLoginClick, 
           onLogoutClick, 
           profile, 
           isAuthenticated } = props;
  
    const content = isAuthenticated ? (
        <div className="logout">
            <Link to="/" onClick={onLogoutClick}>
                Logout
            </Link>
        </div>
    ) : (
        <div className="login">
            <Link to="" onClick={onLoginClick}>
                Login
            </Link>
        </div>
    );

    return (
        <header>
            {content}
        </header>
  );
};

const propTypes = {
  onLoginClick: PropTypes.func,
  onLogoutClick: PropTypes.func,
  profile: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

Navbar.propTypes = propTypes;

export default Navbar;
