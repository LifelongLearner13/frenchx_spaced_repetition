import fetch from 'isomorphic-fetch'

/*------------ FETCH ACTIONS -------------*/

// Authentication url https://huttese-stone.herokuapp.com/auth/google

// PUT request to submit answer
// On initial mounting of component, send empty strings and receive a random word pair back
export const fetchSubmit = (wordId, isCorrect, score) => {
  return (dispatch) => {
    let url = 'https://huttese-stone.herokuapp.com/submitanswer'
    let request = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {wordId: wordId, isCorrect: isCorrect, score: score}
      )}
    return fetch(url, request)
    .then((response) => {
      if (response.status < 200 || response.status >= 300) {
        let error = new Error(response.statusText)
        error.response = response
        throw error
      }
      return response.json()
    })
   .then((data) => {
      // Returns the word pair, splitting word2 into an array
      console.log(data, '<--- Word data')
      let wordId = data._id
      let word1 = data.word1
      let word2 = data.word2.split(', ').join().split(' ')
      let score = data.score
      console.log(word2, '<-- English Word array')
      console.log(score, '<-- Score response ')
      return dispatch(
        fetchSubmitSuccess(word1, word2, wordId, score)
      )
    })
    .catch((error) => {
      return dispatch(
        fetchSubmitError(error)
      )
    })
  }
}



/*----------- ACTIONS ------------*/

const CORRECT_DISPLAY = 'CORRECT_DISPLAY'
const correctDisplay = () => {
  return {
    type: CORRECT_DISPLAY
  }
}

const FETCH_SUBMIT_SUCCESS = 'FETCH_SUBMIT_SUCCESS'
const fetchSubmitSuccess = (word1, word2, wordId, score) => {
  return {
    type: FETCH_SUBMIT_SUCCESS,
    word1: word1,
    word2: word2,
    wordId: wordId,
    score: score
  }
}

const FETCH_SUBMIT_ERROR = 'FETCH_SUBMIT_ERROR'
const fetchSubmitError = (error) => {
  return {
    type: FETCH_SUBMIT_ERROR,
    error: error
  }
}



/*--------  EXPORTS --------*/

exports.CORRECT_DISPLAY = CORRECT_DISPLAY
exports.correctDisplay = correctDisplay

exports.FETCH_SUBMIT_SUCCESS = FETCH_SUBMIT_SUCCESS
exports.fetchSubmitSuccess = fetchSubmitSuccess

exports.FETCH_SUBMIT_ERROR = FETCH_SUBMIT_ERROR
exports.fetchSubmitError = fetchSubmitError
