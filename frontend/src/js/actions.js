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
export const getWords = (username) => {
	const url = 'http://localhost:3000/word'
  return fetch (url, {
  	method: 'GET'
  })
  .then((response) => {
    console.log(response, ' <--response')
    if (response.status < 200 || response.status >= 300) {
      let error = new Error(response.statusText)
      error.response = response
      throw error
    }
    return response
  })
  .then((response) => {
    return resonse.json()
  })
  .then((data) => {
    console.log(data, ' <--data')
  })

}



// Other functions
let fetchWords = () => {
	// do the fetch
	// return value
}


/*----------- ACTIONS ------------*/

exports.GET_PAIR = GET_PAIR
exports.getPair = getPair

exports.UPDATE_WORD = UPDATE_WORD
exports.updateWord = updateWord




