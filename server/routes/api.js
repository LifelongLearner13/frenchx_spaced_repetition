const express = require('express');
const jsonParser = require('body-parser').json();
const spacedRepition = require('../spaced_repitition')
const router = express.Router();

router.put('/word', jsonParser, (request, response) => {
    const { wordID, userInput, userID } = request.body;

    console.log(wordID, userInput, userID);


    // Check request body, send an error if a problem occurs
    // wordID, userInput, and userID must be strings.
    if (typeof wordID !== 'string' || typeof userInput !== 'string' ||
        typeof userID !== 'string') {
        return response.status(422).json({
            message: 'Incorrect field type: wordID, userInput, and userID must be a string'
        })
    }

    let newWord = spacedRepition.getNextWord(userID, wordID, userInput).then(
      function(newWord) {
        console.log('newWord -> ', newWord)
        response.send(newWord);
      });
});

module.exports = router;
