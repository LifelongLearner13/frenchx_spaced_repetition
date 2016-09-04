import React from 'react'


class Answer extends React.Component {

  constructor(props) {
    super(props)
    this.submitAnswer = this.submitAnswer.bind(this)
  }

  submitAnswer() {
    let answer = this.refs.answer.value;
    this.props.checkAnswer(answer);
  }

  render() {
    return (
    	<div className="answer-div">
    		<input onClick={this.props.hideCorrect} type="text" className="answer-input" ref="answer" placeholder={this.props.answerInput} />
    		<button className="login-button" onClick={this.submitAnswer} >Submit</button>
    	</div>
    )
  }

}


export default Answer
