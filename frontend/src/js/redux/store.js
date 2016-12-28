import createLogger from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import thunk, { default } from 'redux-thunk';
const logger = createLogger();

const initialState = {
  auth: {
    isAuthenticated: false,
    profile: {},
    error: '',
    token: '',
  },
  practice: {
    currentWord: 'Backa',
    currentWordID: 1,
    userInput: '',
    feedback: true,
    previousWord: 'Boska',
    previousWordPOS: 'v.',
    previousWordWordPron: 'bosh kah',
    previousWordDef: '1. Search',
    score: 10,
    correct: 1,
    incorrect: 2,
  },
};

const store = createStore(rootReducer,
                initialState,
                compose(
                applyMiddleware(thunk, logger)));


export default store;
