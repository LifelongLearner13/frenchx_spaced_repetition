import fetch from 'isomorphic-fetch'

/*------------ FETCH ACTIONS -------------*/

// Authentication url https://huttese-stone.herokuapp.com/auth/google

// GET Request for Word Pair
export const fetchWords = (username) => {
  return (dispatch) => {
    let url = 'https://huttese-stone.herokuapp.com/word'
    let request = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    return fetch (url, request)
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
      let word2 = data.word2.split(';').join().split(', ')
      return dispatch(
        fetchWordsSuccess(word1, word2, wordId)
      )
    })
    .catch((error) => {
      return dispatch(
        fetchWordsError(error)
      )
    })
  }
}


// POST request to submit answer
export const fetchSubmit = (wordId, isCorrect) => {
  return (dispatch) => {
    let url = 'https://huttese-stone.herokuapp.com/submitanswer'
    let request = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {wordId: wordId, isCorrect: isCorrect}
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
      console.log(data, '<-- Submit data')
      return dispatch(
        fetchSubmitSuccess(wordId, isCorrect)
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

const INCREMENT_SCORE = 'INCREMENT_SCORE'
const incrementScore = () => {
  return {
    type: INCREMENT_SCORE
  }
}

const DECREMENT_SCORE = 'DECREMENT_SCORE'
const decrementScore = () => {
  return {
    type: DECREMENT_SCORE
  }
}

const FETCH_WORDS_SUCCESS = 'FETCH_WORDS_SUCCESS'
const fetchWordsSuccess = (word1, word2, wordId) => {
  return {
    type: FETCH_WORDS_SUCCESS,
    word1: word1,
    word2: word2,
    wordId: wordId
  }
}

const FETCH_WORDS_ERROR = 'FETCH_WORDS_ERROR'
const fetchWordsError = (error) => {
  return {
    type: FETCH_WORDS_ERROR,
    error: error
  }
}

const FETCH_SUBMIT_SUCCESS = 'FETCH_SUBMIT_SUCCESS'
const fetchSubmitSuccess = (wordId, isCorrect) => {
  return {
    type: FETCH_SUBMIT_SUCCESS,
    wordId: wordId,
    isCorrect: isCorrect
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

exports.INCREMENT_SCORE = INCREMENT_SCORE
exports.incrementScore = incrementScore

exports.DECREMENT_SCORE = DECREMENT_SCORE
exports.decrementScore = decrementScore

exports.FETCH_WORDS_SUCCESS = FETCH_WORDS_SUCCESS
exports.fetchWordsSuccess = fetchWordsSuccess

exports.FETCH_WORDS_ERROR = FETCH_WORDS_ERROR
exports.fetchWordsError = fetchWordsError

exports.FETCH_SUBMIT_SUCCESS = FETCH_SUBMIT_SUCCESS
exports.fetchSubmitSuccess = fetchSubmitSuccess

exports.FETCH_SUBMIT_ERROR = FETCH_SUBMIT_ERROR
exports.fetchSubmitError = fetchSubmitError

