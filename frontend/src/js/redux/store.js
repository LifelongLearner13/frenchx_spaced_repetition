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
    word: '',
    score: 0,
    correct: 0,
    incorect: 0
  },
};

const middlewares = [thunk];

// use redux-logger during development
if (process.env.NODE_ENV === `development`) {
  const createLogger = require(`redux-logger`);
  const logger = createLogger();
  middlewares.push(logger);
}

const store = createStore(rootReducer,
                initialState,
                compose(
                applyMiddleware({...middlewares})));


export default store;
