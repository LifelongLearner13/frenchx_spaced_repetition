import {CORRECT_DISPLAY, INCREMENT_SCORE, DECREMENT_SCORE, FETCH_WORDS_SUCCESS, FETCH_WORDS_ERROR, FETCH_SUBMIT_SUCCESS, FETCH_SUBMIT_ERROR} from './actions'
import {combineReducers} from 'redux'

const initialState = {
	word1: '',
	word2: '',
	correct: false, 
	score: 0,
	answerInput: 'Enter Your Answer'
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

	} else if (action.type === INCREMENT_SCORE) {
		return Object.assign({}, state, {
			score: state.score + 10
		})

	} else if (action.type === DECREMENT_SCORE) {
		return Object.assign({}, state, {
			score: state.score - 10
		})

	} else if (action.type === FETCH_WORDS_SUCCESS) {
		let newWord1 = action.word1
		let newWord2 = action.word2
		let wordId = action.wordId
		console.log(word2, '<-- english word')
		return Object.assign({}, state, {
			word1: newWord1,
			word2: newWord2,
			wordId: newWordId,
			answerInput: 'Enter Your Answer'
		})

	} 

	
	return state
} 




module.exports = quizReducer
//export default quizReducer;