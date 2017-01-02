import {EventEmitter} from 'events';
import {isTokenExpired} from './jwt-helper';
import Auth0 from 'auth0-js';
import Auth0Lock from 'auth0-lock';
import {browserHistory} from 'react-router';
import store from '../redux/store.js';
import * as actions from '../redux/actions.js';

// Class to handle authentication via Auth0.
// Most of the code was taken from this example:
// https://auth0.com/docs/quickstart/spa/react/00-getting-started
export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super();
    // Configure Auth0 - we need both inorder to deal with the case
    // where the authenticated event does not fire.
    this.auth0 = new Auth0({clientID: clientId, domain: domain});
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: `${window.location.origin}`,
        responseType: 'token',
      }
    });

    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    // Add callback for lock `authorization_error` event
    this.lock.on('authorization_error', this._authorizationError.bind(this));

    // binds functions to keep this context
    this.login = this.login.bind(this);
    this.loginHash = this.loginHash.bind(this);
  }

  _doAuthentication(authResult) {
    this.setToken(authResult.idToken);

    // navigate to the autherized route
    browserHistory.replace('/practice');

    // Async loads the user profile data
    this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error);
        store.dispatch(actions.loginError(error));
      } else {
        console.log(profile)
        this.setProfile(profile);
        store.dispatch(actions.loginSuccess(authResult.idToken, profile));
      }
    });
  }

  _authorizationError(error) {
    store.dispatch(actions.loginError(error));
    console.log('Authentication Error', error);
  }

  // Hack discussed to get around lock not firing
  // authenticated event after email and password
  // login
  loginHash(hash) {
    let result = this.auth0.parseHash(hash);
    console.log('loginHash ->', result)
    if (result && result.idToken) {
      this._doAuthentication(result);
    } else {
      this._authorizationError('No hash');
    }
  }

  login() {
    // Display the lock widget.
    this.lock.show();
  }

  loggedIn() {
    // Check for saved token and if it's still valid
    const token = this.getToken();
    const loggedStatus = !!token && !isTokenExpired(token);

    if (loggedStatus) {
      store.dispatch(actions.loginSuccess(token, this.getProfile()));
      browserHistory.replace('/practice');
    } else {
      browserHistory.replace('/');
    }

    return loggedStatus;
  }

  setProfile(profile) {
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  getProfile() {
    const profile = localStorage.getItem('profile');
    return profile
      ? JSON.parse(localStorage.profile)
      : {};
  }

  setToken(idToken) {
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    store.dispatch(actions.logoutSuccess());
  }
};
