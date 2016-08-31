var React = require('react');


var Answer = React.createClass({

  submitAnswer: function() {
    console.log('in submitAnswer, answer is ', this.refs.answer.value);
    var answer = this.refs.answer.value;
    this.props.checkAnswer(answer);
  },

  render: function() {
    return (
    	<div>
    		<input type="text" id="answerInput" ref="answer" placeholder={this.props.answerInput} />
    		<button type="Submit" onClick={this.submitAnswer} >Submit</button>
    	</div>
    );
  }
});


module.exports = Answer;