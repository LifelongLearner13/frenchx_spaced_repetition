import fetch from 'isomorphic-fetch'

const API_URL = `${window.location.origin}/api`;

// ========= Action Types ============
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const FORM_SUBMIT = 'FORM_SUBMIT';
export const FORM_INPUT_CHANGE = 'FORM_INPUT_CHANGE';

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

export function fetchOnFormSubmit(wordId, word) {
  return (dispatch) => {
    let request = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( { wordId, word } )
    };

    return fetch(`${API_URL}/word`, request).then(
      (response) => {
        if (response.status < 200 || response.status >= 300) {
          let error = new Error(response.statusText)
          error.response = response
          throw error
        }

        return response.json()
      }).then(
        (data) => {
          console.log(data);
          return dispatch(
            fetchSubmitSuccess(wordID, word,
                              feedback, previousWord,
                              previousWordWordPOS, previousWordWordPron,
                              previousWordDef)
          );
      }).catch(
        (error) => {
          return dispatch(
            fetchSubmitError(error)
          )
        }
    );
  };
};
