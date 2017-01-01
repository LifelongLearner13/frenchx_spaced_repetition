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

    spacedRepition.scoreAndUpdate(userID, wordID, userInput);

    // // User has just logged in and we need to load the first word
    // if (wordId === '' && isCorrect === '' && score === '') {
    //     spaced_repitition.getNextWord(userId).then((results, error) => {
    //         if (error) {
    //             throw error
    //         }
    //         res.json(results)
    //     })
    // // The user has answered a word and needs a new one to train on
    // } else {
    //     spaced_repitition
    //         .getNextWord(userId, wordId, isCorrect === 'true', score)
    //         .then((results, error) => {
    //             if (error) {
    //                 throw error
    //             }
    //             res.json(results)
    //         })
    // }
    //
    response.json({
      wordID: 2,
      word: 'Backa',
      isCorrect: true,
      previousWord: 'Boska',
      previousWordPOS: 'v.',
      previousWordPron: 'bosh kah',
      previousWordDef: '1. Search'
    });
});

module.exports = router;
