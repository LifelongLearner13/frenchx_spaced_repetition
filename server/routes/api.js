const express = require('express');
const jsonParser = require('body-parser').json();

const router = express.Router();

router.put('/word', jsonParser, (request, response) => {
    const wordId = request.body.wordID;
    const userInput = request.body.userInput;
    // Some user_id's are numbers and some are alphanumeric.
  // const userIdentity = `${request.user.userID}`;

    response.json({
      wordID: 2,
      word: 'Backa',
      isCorrect: true,
      previousWord: 'Boska',
      previousWordPOS: 'v.',
      previousWordPron: 'bosh kah',
      previousWordDef: '1. Search'
    });
    // Check request body, send an error if a problem occurs
    // wordId and isCorrect must be strings. isCorrect must be true, false, or
    // empty string. Score must be a number or an empty string.
    // if (typeof wordId !== 'string' || typeof isCorrect !== 'string') {
    //     return res.status(422).json({
    //         message: 'Incorrect field type: wordId and isCorrect must be a string'
    //     })
    // }
    // if (typeof score !== 'number' && score !== '') {
    //     return res.status(422).json({
    //         message: 'Incorrect field type: score must be a number or ""'
    //     })
    // }
    // if (!(isCorrect === 'true' || isCorrect === 'false' || isCorrect === '')) {
    //     return res.status(422).json({
    //         message: 'Incorrect value for isCorrect, must be "true", "false" or ""'
    //     })
    // }
    //
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
});

module.exports = router;
