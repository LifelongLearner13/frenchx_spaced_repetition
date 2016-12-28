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
    currentWord: '',
    currentWordID: 0,
    userInput: '',
    feedback: false,
    previousWord: '',
    previousWordWordPOS: '',
    previousWordWordPron: '',
    previousWordDef: '',
    score: 0,
    correct: 0,
    incorect: 0
  },
};

const store = createStore(rootReducer,
                initialState,
                compose(
                applyMiddleware(thunk, logger)));


export default store;
