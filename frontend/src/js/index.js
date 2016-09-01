import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'
import {Provider} from 'react-redux'

import * as actions from './actions'
import store from './store'

import Landing from './components/Landing'
import QuizContainer from'./components/Quiz-Container'

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Provider store={store}>
			<Router history={hashHistory}>
				<Route path="/" component={Landing} />
				<Route path="/quiz" component={QuizContainer} />
			</Router>
		</Provider>, document.getElementById('root')
	)
})