import {GET_PAIR, UPDATE_WORD} from './actions'
import {combineReducers} from 'redux'



let quizReducer = (state, action) => {
	state = state || {}

	if (action.type === GET_PAIR) {
		 
		return state

	} else if (action.type === UPDATE_WORD) {

		return state
	}
	return state
}




module.exports = quizReducer
//export default quizReducer;