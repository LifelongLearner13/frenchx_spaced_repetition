import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'
import * as actions from './actions'
import thunk, { default } from 'redux-thunk'


const store = createStore(reducers, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f))


export default store
