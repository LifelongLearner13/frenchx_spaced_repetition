import {CORRECT_DISPLAY, FETCH_SUBMIT_SUCCESS} from './actions'
import {combineReducers} from 'redux'

const initialState = {
	word1: '',
	word2: '',
	correct: false, 
	score: 0
}

let quizReducer = (state, action) => {
	state = state || initialState
	
	if (action.type === CORRECT_DISPLAY) {
		if (state.correct) {
			return Object.assign({}, state, {
				correct: false
			})
		} else {
			return Object.assign({}, state, {
				correct: true
			})
		}

	} else if (action.type === FETCH_SUBMIT_SUCCESS) {	
		return Object.assign({}, state, {
			word1: action.word1,
			word2: action.word2,
			wordId: action.wordId,
			score: action.score || 0
		})

	} 

	
	return state
} 




module.exports = quizReducer
//export default quizReducer;