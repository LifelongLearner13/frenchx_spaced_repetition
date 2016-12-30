import {combineReducers} from 'redux';
import * as actionType from './actions'

function authReducer(state = {}, action) {
  switch (action.type) {
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        profile: action.profile,
        token: action.token,
        error: ''
      };
    case actionType.LOGIN_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        profile: '',
        token: '',
        error: action.error
      };
    case actionType.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        profile: '',
        token: '',
        error: ''
      };
    case actionType.LOGOUT_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        profile: '',
        token: '',
        error: action.error
      };
    default:
      return state;
  };
};

function practiceReducer(state = {}, action) {
  switch (action.type) {
    case actionType.FETCH_WORD_SUCCESS:
      return {
        ...state,
        showFeedback: true,
        wordID: action.wordID,
        word: action.word,
        isCorrect: action.isCorrect,
        previousWord: action.previousWord,
        previousWordPOS: action.previousWordPOS,
        previousWordPron: action.previousWordPron,
        previousWordDef: action.previousWordDef
      };
    case actionType.FETCH_WORD_ERROR:
      return {
        ...state,
        error: action.error
      };
    case actionType.FETCH_WORD_REQUEST:
      return {
        ...state
      };
    case actionType.NEXT_WORD:
      return {
        ...state,
        showFeedback: false
      }
    default:
      return state;
  };
};

const rootReducer = combineReducers({auth: authReducer, practice: practiceReducer});

export default rootReducer;
