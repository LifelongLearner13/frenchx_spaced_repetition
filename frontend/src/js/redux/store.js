import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const initialState = {
  auth: {
    isAuthenticated: false,
    profile: {},
    error: '',
    token: ''
  },
  practice: {
    currentWord: 'Backa',
    currentWordID: 1,
    userInput: '',
    showFeedback: false,
    isCorrect: false,
    previousWord: 'Boska',
    previousWordPOS: 'v.',
    previousWordPron: 'bosh kah',
    previousWordDef: '1. Search'
  }
};

const middlewares = [thunk];

// use redux-logger during development
if (process.env.NODE_ENV === `Development`) {
  const createLogger = require(`redux-logger`);
  const logger = createLogger();
  middlewares.push(logger);
}

const store = createStore(rootReducer, initialState,
  compose(applyMiddleware( ...middlewares )));

export default store;
