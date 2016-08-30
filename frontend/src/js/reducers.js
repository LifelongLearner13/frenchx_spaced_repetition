import {GET_PAIR, UPDATE_WORD} from './actions'
import * as actions from './actions'
import {combineReducers} from 'redux'

// let initialWordState = {

// };
let quizReducer = (state, action) => {
	state = state || {}

	if (action.type === actions.GET_PAIR) {
		console.log('hello')
		return state

	} else if (action.type === actions.UPDATE_WORD) {
		console.log('hello')
		return state
	}
	return state
}




module.exports = quizReducer
//export default quizReducer;