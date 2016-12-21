import {
    EventEmitter
}
from 'events';
import {
    isTokenExpired
}
from './jwt-helper';
import Auth0 from 'auth0-js';
import Auth0Lock from 'auth0-lock';
import {
    browserHistory
}
from 'react-router';
//import router from './routes/router';
import store from '../redux/store.js';
import * as actions from '../redux/actions.js';

export default class AuthService extends EventEmitter {
    constructor(clientId, domain) {
        super();
        // Configure Auth0
        this.auth0 = new Auth0({
            clientID: clientId,
            domain: domain
        });
        this.lock = new Auth0Lock(clientId, domain, {
            auth: {
                redirectUrl: `${window.location.origin}`,
                responseType: 'token'
            }
        });
        // Add callback for lock `authenticated` event
        this.lock.on('authenticated', this._doAuthentication.bind(this));
        // Add callback for lock `authorization_error` event
        this.lock.on('authorization_error', this._authorizationError.bind(this));

        // binds login functions to keep this context
        this.login = this.login.bind(this);
        this.loginHash = this.loginHash.bind(this);
    }

    _doAuthentication(authResult) {
        console.log(`authResult =>`, authResult);
        // Saves the user token
        this.setToken(authResult.idToken);
        // navigate to the home route
        browserHistory.replace('/practice');
        // Async loads the user profile data
        this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
            if (error) {
                console.log('Error loading the Profile', error);
                store.dispatch(actions.loginError(error));
            } else {
                store.dispatch(actions.loginSuccess(authResult.idToken, profile));
                this.setProfile(profile);
            }
        })
    }

    _authorizationError(error) {
        // Unexpected authentication error
        store.dispatch(actions.loginError(error));
        console.log('Authentication Error', error);
    }

    loginHash(hash) {
        let result = this.auth0.parseHash(hash);
        console.log('loginHash ->', result)
        if (result && result.idToken) {
            this.setToken(result.idToken);
        }
    }

    login() {
        // Call the show method to display the widget.
        this.lock.show();
    }

    loggedIn() {
        console.log('loggedIn called')
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        const loggedStatus = !!token && !isTokenExpired(token);
        if (loggedStatus) {
            store.dispatch(
                actions.loginSuccess(
                    token, this.getProfile()));
        } else {
            browserHistory.replace('/');
        }

        return loggedStatus;
    }

    setProfile(profile) {
        // Saves profile data to localStorage
        localStorage.setItem('profile', JSON.stringify(profile));
    }

    getProfile() {
        // Retrieves the profile data from localStorage
        const profile = localStorage.getItem('profile');
        return profile ? JSON.parse(localStorage.profile) : {};
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        store.dispatch(actions.logoutSuccess());
    }
};
