/*------------ FETCH ACTIONS -------------*/
import fetch from 'isomorphic-fetch'

/* {
word1: 'Huttese Word'  
word2: 'English Translation'
weight: 10
}

The GET enpoint to get the next word pair is ‘/word’ and the PUT enpoint for updating the words ‘’weight” or memory value is ‘/submitanswer'
*/

const GET_PAIR = 'GET_PAIR'
let getPair = (words) => {
  return {
    type: GET_PAIR,
    words: words
  }
}

const UPDATE_WORD = 'UPDATE_WORD'
let updateWord = (word) => {
  return {
    type: UPDATE_WORD,
    word: word
  }
}

// GET Request for Word Pair
export const fetchWords = (username) => {
  return (dispatch) => {
  	let url = 'https://frenchx.herokuapp.com/word'
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
      console.log(data, '<--- Fetch data')
      let word1 = data.word1
      let word2 = data.word2.split(';').join().split(', ')
      return dispatch(
        fetchWordsSuccess(word1, word2)
      )
    })
    .catch((error) => {
      return dispatch(
        fetchWordsError(error)
      )
    })
  }
}

const FETCH_WORDS_SUCCESS = 'FETCH_WORDS_SUCCESS'
const fetchWordsSuccess = (word1, word2) => {
  return {
    type: FETCH_WORDS_SUCCESS,
    word1: word1,
    word2: word2
  }
}

const FETCH_WORDS_ERROR = 'FETCH_WORDS_ERROR'
const fetchWordsError = (error) => {
  return {
    type: FETCH_WORDS_ERROR,
    error: error
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





/*--------  EXPORTS --------*/
exports.GET_PAIR = GET_PAIR
exports.getPair = getPair

exports.UPDATE_WORD = UPDATE_WORD
exports.updateWord = updateWord

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

