import createLogger from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import * as actions from './actions';
import thunk, { default } from 'redux-thunk';
import jwtDecode from 'jwt-decode';

// If the token currently in local storage is still valid, log the user in
function checkTokenExpiry() {
  const jwt = localStorage.getItem('idToken');
  if (jwt) {
    const jwtExp = jwtDecode(jwt).exp;
    const expiryDate = new Date(0);
    expiryDate.setUTCSeconds(jwtExp);

    if (new Date() < expiryDate) {
      return true;
    }
  }

  return false;
}

function getProfile() {
  return JSON.parse(localStorage.getItem('profile'));
}

function getToken() {
  return localStorage.getItem('idToken');
}

// const logger = createLogger();

const initialState = {
  auth: {
    isAuthenticated: checkTokenExpiry(),
    profile: getProfile(),
    error: '',
    token: getToken(),
  },
  quiz: {
    word: '',
    score: 0,
    correct: 0,
    incorect: 0
  },
};

const store = createStore(reducers, initialState,
               compose(applyMiddleware(thunk), 
               window.devToolsExtension ? window.devToolsExtension() : f => f));


export default store;
