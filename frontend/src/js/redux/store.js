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
    showFeedback: true,
    isCorrect: false,
    previousWord: 'Boska',
    previousWordPOS: 'v.',
    previousWordPron: 'bosh kah',
    previousWordDef: '1. Search',
  },
};

const store = createStore(rootReducer,
                initialState,
                compose(
                applyMiddleware(thunk, logger)));


export default store;
