import fetch from 'isomorphic-fetch'

// ========= Action Types ============
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

// ==== Auth Lock Action Creators ====

export function loginSuccess(token, profile) {
  return {
    type: LOGIN_SUCCESS,
    profile,
    token,
  };
};

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
};

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export function logoutError(error) {
  return {
    type: LOGOUT_ERROR,
    error,
  };
};


///*------------ FETCH ACTIONS -------------*/
//
//// PUT request to submit answer and GET new word pair / score
//export var fetchSubmit = (wordId, isCorrect, score) => {
//  return (dispatch) => {
//    let url = 'https://huttese-stone.herokuapp.com/submitanswer'
//    let request = {
//      method: 'PUT',
//      headers: {
//        'Accept': 'application/json',
//        'Content-Type': 'application/json'
//      },
//      body: JSON.stringify(
//        {wordId: wordId, isCorrect: isCorrect, score: score}
//      )}
//    return fetch(url, request)
//    .then((response) => {
//      if (response.status < 200 || response.status >= 300) {
//        let error = new Error(response.statusText)
//        error.response = response
//        throw error
//      }
//      return response.json()
//    })
//   .then((data) => {
//      // Returns the word pair, splitting word2 into an array
//      let wordId = data._id
//      let word1 = data.word1
//      // let word2 = data.word2.split(', ').join().split(' ')
//      let word2 = data.word2.split(';').join().split(', ')
//      let score = data.score
//      console.log(word2, '<-- Answer')
//      console.log(score, '<-- Score response')
//      return dispatch(
//        fetchSubmitSuccess(word1, word2, wordId, score)
//      )
//    })
//    .catch((error) => {
//      return dispatch(
//        fetchSubmitError(error)
//      )
//    })
//  }
//}
//
//
//
///*----------- ACTIONS ------------*/
//
//export const CORRECT_DISPLAY = 'CORRECT_DISPLAY'
//export var correctDisplay = () => {
//  return {
//    type: CORRECT_DISPLAY
//  }
//}
//
//export const HIDE_CORRECT = 'HIDE_CORRECT'
//export var hideCorrect = () => {
//  return {
//    type: HIDE_CORRECT
//  }
//}
//
//export const FETCH_SUBMIT_SUCCESS = 'FETCH_SUBMIT_SUCCESS'
//export var fetchSubmitSuccess = (word1, word2, wordId, score) => {
//  return {
//    type: FETCH_SUBMIT_SUCCESS,
//    word1: word1,
//    word2: word2,
//    wordId: wordId,
//    score: score
//  }
//}
//
//export const FETCH_SUBMIT_ERROR = 'FETCH_SUBMIT_ERROR'
//export var fetchSubmitError = (error) => {
//  return {
//    type: FETCH_SUBMIT_ERROR,
//    error: error
//  }
//}
