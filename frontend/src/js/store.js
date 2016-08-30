import redux from 'redux';
import createStore from 'redux.createStore';
import applyMiddleware from 'redux.applyMiddleware';
import thunk from 'redux-thunk.default';

import reducers from './reducers';

let store = createStore(reducers.wordReducer, applyMiddleware(thunk));

export default store;