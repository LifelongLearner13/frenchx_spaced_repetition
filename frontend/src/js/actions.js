import fetch from 'isomorphic-fetch';

//  Creating constants
const GET_PAIR = 'GET_PAIR'
const UPDATE_WORD = 'UPDATE_WORD'

//  creating/exporting action creators
export let getWords = () => {
	const url = 'http://localhost:3000/words'
  return fetch (url, {
  	method: 'GET'
  }).then(function (words) {
  	words: words 
    type: GET_PAIR,
  };
};

// Other functions
let fetchWords = () => {
	// do the fetch
	// return value
}

let updateWord = (updatedWord) => {
	getWords().then(function (resp) {
		words = resp;
	});
  return {
    type: UPDATE_WORD,
    word: updatedWord
  };
};

// exports.getWords = getWords;


/* {
french: 'de'	
english: 'of, from, by, than, in, with'
weight: 10

}

The GET enpoint to get the next word pair is ‘/words’ and the PUT enpoint for updating the words ‘’weight” or memory value is ‘/submitanswer'
*/