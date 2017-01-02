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
    currentWord: '',
    currentWordID: '',
    userInput: '',
    showFeedback: false,
    isCorrect: false,
    previousWord: '',
    previousWordPOS: '',
    previousWordPron: '',
    previousWordDef: ''
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
