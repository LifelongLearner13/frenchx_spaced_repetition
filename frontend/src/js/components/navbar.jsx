import React, { PropTypes } from 'react';
import Auth0Lock from 'auth0-lock';
import { Link } from 'react-router';

const SERVER_URL = window.location.origin;

const propTypes = {
  onLogoutClick: PropTypes.func,
  profile: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

function Navbar(props) {
  const lock = new Auth0Lock('6ElpyE9EazmBox2b9PAWytCnFJQTxBCa', 'ericsnell.auth0.com', {
    auth: {
      redirectUrl: `${SERVER_URL}/#/main`,
      responseType: 'token',
      params: {
        scope: 'name email',
      },
    },

    languageDictionary: {
      emailInputPlaceholder: 'something@youremail.com',
      title: 'Log me in',
    },
  });

  lock.on('authenticated', (authResult) => {
    props.getProfile(lock, authResult);
  });

  const { onLogoutClick, profile, isAuthenticated } = props;
  const navContent = isAuthenticated ? (
    <div className="logout">
      <Link to="/" onClick={onLogoutClick}>
        Logout
      </Link>
    </div>
  ) : (
    <div className="login">
      <Link to="#" onClick={() => { lock.show(); }}>
        Login
      </Link>
    </div>
  );

  return (
    <header>
        {navContent}
    </header>
  );
}

Navbar.propTypes = propTypes;

module.exports = Navbar;
