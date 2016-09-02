var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../actions');
var LogOutButton = require('./logout-button');
var Correct = require('./correct');
var CurrentWord = require('./currentword');
var Answer = require('./answer');
var Score = require('./score');


var QuizContainer = React.createClass({

    checkAnswer: function(answer) {
        var word2Array = this.props.word2;
        var foundWord;

        // Loops through English words array for user's answer.  
        for (var i = 0; i < word2Array.length; i++) {
            // If a match, show 'Correct!', increase score, fetch new words, submit to backend
            if (answer.toLowerCase() === word2Array[i].toLowerCase()) {
                foundWord = true;
                let score = this.props.score + 10
                this.props.dispatch(actions.correctDisplay());
                //  this.props.dispatch(actions.incrementScore());
                this.props.dispatch(actions.fetchSubmit('', '', score))
                break
            }
            // If not match, decrement score and fetch new word pair
            if (i === word2Array.length - 1 && !foundWord) {
                let score = this.props.score - 10
                    //  this.props.dispatch(actions.decrementScore());
                this.props.dispatch(actions.fetchSubmit(this.props.wordId, 'false', score))
            }
        }
    },

    // Fetches new word pair on initial mounting of component
    componentDidMount: function() {
        // On initial mount, send empty strings and receive a random word pair back
        this.props.dispatch(actions.fetchSubmit('', '', ''))
    },

    logOutUser: function() {
        // TODO: Needs to dispatch action to log out user
    },

    // Toggles 'correct' state boolean to show/hide 'Correct!' display
    toggleCorrect: function() {
        this.props.dispatch(actions.correctDisplay())
    },

    render: function() {
      return (
      <div className = "Quiz">

        <div className="quiz-header">
          <div className = "logout" >
            <a href = "https://huttese-stone.herokuapp.com/logout" > <button>Log Out</button></a>
          </div>
          <img src="../rosettabg.png" />
        </div>
        
        <div className="cards">
          <div className="current-word">
            <CurrentWord word1={this.props.word1} />
          </div>
          <div className="answer">    
            <Answer checkAnswer={this.checkAnswer} word2={this.props.word2} answerInput={this.props.answerInput} />
          </div>
        </div>

        <div className="correct">
          <Correct correct={this.props.correct} toggleCorrect={this.toggleCorrect} />
        </div>

        <div className="score">
          <Score score={this.props.score} / >
        </div>
      </div>
        );
    }
});

var mapStateToProps = function(state, props) {
    return {
        word1: state.word1,
        word2: state.word2,
        wordId: state.wordId,
        score: state.score,
        correct: state.correct,
        answerInput: state.answerInput
    }
};

var Container = connect(mapStateToProps)(QuizContainer);
module.exports = Container;