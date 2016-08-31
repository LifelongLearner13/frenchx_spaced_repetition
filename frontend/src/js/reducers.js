import {GET_PAIR, UPDATE_WORD, CORRECT_DISPLAY, INCREMENT_SCORE, DECREMENT_SCORE, FETCH_WORDS_SUCCESS, FETCH_WORDS_ERROR} from './actions'
import {combineReducers} from 'redux'

const initialState = {
	french: '',
	english: '',
	correct: false, 
	score: 0
}

let quizReducer = (state, action) => {
	state = state || initialState

	if (action.type === GET_PAIR) {
		 
		return state

	} else if (action.type === UPDATE_WORD) {

		return state

	} else if (action.type === CORRECT_DISPLAY) {
		return Object.assign({}, state, {
			correct: true
		})

	} else if (action.type === INCREMENT_SCORE) {
		return Object.assign({}, state, {
			score: state.score + 1
		})

	} else if (action.type === DECREMENT_SCORE) {
		return Object.assign({}, state, {
			score: state.score - 1
		})

	} else if (action.type === FETCH_WORDS_SUCCESS) {
		let frenchWord = action.french
		let englishWord = action.english
		return Object.assign({}, state, {
			french: frenchWord,
			english: englishWord
		})

	} 




	return state
} 




module.exports = quizReducer
//export default quizReducer;