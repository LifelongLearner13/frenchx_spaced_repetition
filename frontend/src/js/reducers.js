import { CORRECT_DISPLAY, HIDE_CORRECT, FETCH_SUBMIT_SUCCESS } from './actions'


const initialState = {
	word1: '',
	word2: '',
	correct: false,
	score: 0
}

var quizReducer = (state, action) => {
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

	} else if (action.type === HIDE_CORRECT) {
		return Object.assign({}, state, {
			correct: false
		})
	}

	return state
}


export default quizReducer;
