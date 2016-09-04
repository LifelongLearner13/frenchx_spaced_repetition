var React = require('react');


var Answer = React.createClass({

  submitAnswer: function() {
    console.log('in submitAnswer, answer is ', this.refs.answer.value);
    var answer = this.refs.answer.value;
    this.props.checkAnswer(answer);
  },

  render: function() {
    return (
    	<div className="answer-div">
    		<input onClick={this.props.hideCorrect} type="text" className="answer-input" ref="answer" placeholder={this.props.answerInput} />
    		<button className="login-button" onClick={this.submitAnswer} >Submit</button>
    	</div>
    );
  }
});


module.exports = Answer;
