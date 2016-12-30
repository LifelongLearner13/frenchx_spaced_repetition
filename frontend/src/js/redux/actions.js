import fetch from 'isomorphic-fetch'

const API_URL = `${window.location.origin}/api`;

/*---------- ACTION TYPES ----------*/
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const FETCH_WORD_REQUEST = 'FETCH_WORD_REQUEST';
export const FETCH_WORD_SUCCESS = 'FETCH_WORD_SUCCESS';
export const FETCH_WORD_ERROR = 'FETCH_WORD_ERROR';
export const NEXT_WORD = 'NEXT_WORD';

/*------ AUTH ACTION CREATER -------*/
export function loginSuccess(token, profile) {
  return {type: LOGIN_SUCCESS, profile, token};
};

export function loginError(error) {
  return {type: LOGIN_ERROR, error};
};

export function logoutSuccess() {
  return {type: LOGOUT_SUCCESS};
};

export function logoutError(error) {
  return {type: LOGOUT_ERROR, error};
};

export function fetchWordRequest() {
  return {type: FETCH_WORD_REQUEST};
};

export function fetchWordSuccess(wordID, word, isCorrect, previousWord, previousWordPOS, previousWordPron, previousWordDef) {
  return {
    type: FETCH_WORD_SUCCESS,
    wordID,
    word,
    isCorrect,
    previousWord,
    previousWordPOS,
    previousWordPron,
    previousWordDef
  };
};

export function fetchWordError(error) {
  return {type: FETCH_WORD_ERROR, error};
};

export function fetchWord(userInput, wordId, token, userID) {
  console.log('fetchWord: ', userInput, wordId, token, userID)
  return (dispatch) => {
    let request = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({userInput, wordId, userID}),
    };

    dispatch(fetchWordRequest()); // Tell react the async request is starting

    return fetch(`${API_URL}/word`, request).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }

      return response.json()
    }).then((data) => {
      console.log(data);
      const {
        wordID,
        word,
        isCorrect,
        previousWord,
        previousWordPOS,
        previousWordPron,
        previousWordDef
      } = data;
      return dispatch(fetchWordSuccess(wordID, word, isCorrect, previousWord, previousWordPOS, previousWordPron, previousWordDef));
    }).catch((error) => {
      return dispatch(fetchWordError(error));
    });
  };
};

export function nextWord() {
  return {type: NEXT_WORD}
}
