import {createStore, applyMiddleware, compose} from 'redux'
import reducers from './reducers'
import actions from './actions'
// import thunk, {default} from 'redux-thunk'
var thunk = require('redux-thunk').default;

let store = createStore(reducers, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f))

module.exports = store