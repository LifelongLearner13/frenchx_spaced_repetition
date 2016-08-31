var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../actions');
var LogOutButton = require('./logout-button');
var Correct = require('./correct');
var CurrentWord = require('./currentword');
var Answer = require('./answer');
var Score = require('./score');



var QuizContainer = React.createClass({

  componentDidMount: function() {
    this.props.dispatch(actions.fetchWords())
  },

  logOutUser: function() {
  // TODO: Needs to dispatch action to log out user
  },

  // checkAnswer: function() {
  //   // TODO: Needs to dispatch action that sends boolean for right/wrong answer
  //   var answer = this.refs.answer.value;
  //   console.log(answer, '<-- Answer value');
  //   if (answer === this.props.english) {
  //     this.props.dispatch(actions.correctDisplay());
  //     this.props.dispatch(actions.incrementScore());
  //   } else {
  //     this.props.dispatch(actions.decrementScore());
  //   }
  //   this.props.dispatch(actions.fetchWords());
  // },

  render: function() {
    return (
      <div className="Quiz">
        <div className="Quiz-header">
          <h2>FrenchX Header</h2>
          <LogOutButton logOutUser={this.logOutUser} />
        </div>
        <Correct correct={this.props.correct} />
        <CurrentWord french={this.props.french} />      
        <Answer checkAnswer={this.checkAnswer} english={this.props.english} />
        <Score score={this.props.score} />
      </div>

    );
  }
});

var mapStateToProps = function(state, props) {
  return {
    correct: state.correct,
    french: state.french,
    english: state.english,
    score: state.score
  }
};

var Container = connect(mapStateToProps)(QuizContainer);
module.exports = Container;
