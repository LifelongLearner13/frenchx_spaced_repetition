var React = require('react');
var connect = require('react-redux').connect;
var LogOutButton = require('./logout-button');
var Correct = require('./correct');
var CurrentWord = require('./currentword');
var Answer = require('./answer');
var Score = require('./score');


var QuizContainer = React.createClass({
  logOutUser: function() {
  // TODO: Needs to dispatch action to log out user
  },

  checkAnswer: function() {
    // TODO: Needs to dispatch action that sends boolean for right/wrong answer
  },

  render: function() {
    return (
      <div className="Quiz">
        <div className="Quiz-header">
          <h2>FrenchX Header</h2>
          <LogOutButton logOutUser={this.logOutUser} />
        </div>
        <Correct correctDisplay={this.props.correctDisplay} />
        <CurrentWord word={this.props.word} />      
        <Answer checkAnswer={this.checkAnswer} />
        <Score score={this.props.score} />
      </div>

    );
  }
});

var mapStateToProps = function(state, props) {
  return {
    correctDisplay: state.correctDisplay,
    word: state.word,
    score: state.score
  }
};

var Container = connect(mapStateToProps)(QuizContainer);
module.exports = Container;
