/*------------ FETCH ACTIONS -------------*/
import fetch from 'isomorphic-fetch'

/* {
french: 'de'  
english: 'of, from, by, than, in, with'
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
      console.log(response, ' <--response')
      if (response.status < 200 || response.status >= 300) {
        let error = new Error(response.statusText)
        error.response = response
        throw error
      }
      return response.json()
    })
    .then((data) => {
      console.log(data, ' <--data')
      return dispatch(
        fetchWordsSuccess(data)
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
const fetchWordsSuccess = (words) => {
  return {
    type: FETCH_WORDS_SUCCESS,
    words: words
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













/*--------  EXPORTS --------*/
exports.GET_PAIR = GET_PAIR
exports.getPair = getPair

exports.UPDATE_WORD = UPDATE_WORD
exports.updateWord = updateWord