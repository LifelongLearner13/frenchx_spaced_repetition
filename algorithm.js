// Spaced Repetition Algorithm

// uses a data structure
// user logins in
// either read all word docs from db or populate from user document
//
// lower numbers represent higher priority, higher weights should appear less often
<<<<<<< HEAD
/*
Create a spaced repetition app for learning a foreign language
Gives you a word in the language, asks you to type it in English (or vice-versa)
Features:
OAuth login
Saving user's progress

Word pairs earlier in the list should first appear earlier than pairs later in the list
Repetitions should start out close together
Repetitions should get further apart if you answer correctly
Repetitions should get closer together if you answer incorrectly
Example: Four questions, ABCD
ABABCACBDCADB...

Given a list of questions with corresponding "memory values", M, starting at 1:
    Take the first question in the list
    Ask the question
    If the answer was correct:
        Double the value of M
    If the answer was wrong:
        Reset M to 1
    Move the question back M places in the list

*/
=======


/* BETTER */
Given a list of questions:
	Take the first question in the list
	Ask the question
	If the answer was correct:
		Put the question at the back of the list
	If the answer was wrong
		Move the question back one in the list


1. The questions will be pulled from an array
2. The array contains a list of objects
3. The properties of each object are the word and weight referencing the user
4. All weights are initially set to 1 for each users question
5. We first pull a random question item from the list that has a weight of 1
6. If question is correct, increase the weight so it is sorted to the end of the list
7. If the question is wrong, set it back one in the list so it follows the following question


/* BETTER STILL */
	Given a list of questions with corresponding 'weight', starting at 1
		Take the first question in the list
		Ask the question
		If the answer was correct:
			Double the value of 'weight'
		If the answer was wrong:
			Reset 'weight' to 1
		Move the question back ('weight') places in the list


// Send word _id back with boolean (as a string) stating whether answer was right or wrong
// wordId: '42jfid2998ccd', isCorrect: 'true'





>>>>>>> loginButton
