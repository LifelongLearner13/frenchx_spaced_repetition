// Spaced Repetition Algorithm

// uses a data structure
// user logins in
// either read all word docs from db or populate from user document
//
// lower numbers represent higher priority, higher weights should appear less often
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
