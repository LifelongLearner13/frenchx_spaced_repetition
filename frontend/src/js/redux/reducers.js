import { combineReducers } from 'redux';
import * as actionType from './actions'

function authReducer(state = {}, action) {
    switch (action.type) {
        case actionType.LOGIN_SUCCESS:
            return { ...state, 
                    isAuthenticated: true,
                    profile: action.profile,
                    token: action.token,
                    error: '', };
        case actionType.LOGIN_ERROR:
            return { ...state, 
                    isAuthenticated: false,
                    profile: '',
                    token: '',
                    error: action.error, };
        case actionType.LOGOUT_SUCCESS:
            return { ...state,
                    isAuthenticated: false,
                    profile: '',
                    token: '',
                    error: '', };
        case actionType.LOGOUT_ERROR:
            return { ...state, 
                    isAuthenticated: false,
                    profile: '',
                    token: '',
                    error: action.error, };
        default:
            return state;
    };
};

function practiceReducer(state = {}, action) {
    switch (action.type) {
        default:
            return state;
    };
};

//var quizReducer = (state, action) => {
//	state = state || initialState
//
//	if (action.type === CORRECT_DISPLAY) {
//		if (state.correct) {
//			return Object.assign({}, state, {
//				correct: false
//			})
//		} else {
//			return Object.assign({}, state, {
//				correct: true
//			})
//		}
//
//	} else if (action.type === FETCH_SUBMIT_SUCCESS) {
//		return Object.assign({}, state, {
//			word1: action.word1,
//			word2: action.word2,
//			wordId: action.wordId,
//			score: action.score || 0
//		})
//
//	} else if (action.type === HIDE_CORRECT) {
//		return Object.assign({}, state, {
//			correct: false
//		})
//	}
//
//	return state
//}

const rootReducer = combineReducers({
  auth: authReducer,
  practice: practiceReducer,
});

export default rootReducer;
