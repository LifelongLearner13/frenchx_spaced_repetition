import React from 'react'
import ReactDOM from 'react-dom'
var Provider = require('react-redux').Provider;
// import Provider from 'react-redux.Provider'

import store from './store'

import Landing from './components/Landing/Landing'
import QuizContainer from'./components/Quiz/Quiz-Container'

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Provider store={store}>
		  <QuizContainer />
		</Provider>, document.getElementById('root')
	)
})
