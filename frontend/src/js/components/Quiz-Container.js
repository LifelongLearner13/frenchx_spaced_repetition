import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Correct from './correct'
import CurrentWord from './currentword'
import Answer from './answer'
import Score from './score'


class QuizContainer extends React.Component {

  // We need to manually bind instance methods in ES6
  constructor(props) {
    super(props)
    this.checkAnswer = this.checkAnswer.bind(this)
    this.hideCorrect = this.hideCorrect.bind(this)
  }

  checkAnswer(answer) {
    let word2Array = this.props.word2;
    let foundWord;

    // Loops through English words array for user's answer.
    for (var i = 0; i < word2Array.length; i++) {
      // If a match, show 'Correct!', increase score, fetch new words, submit to backend
      if (answer.toLowerCase() === word2Array[i].toLowerCase()) {
        foundWord = true;
        let score = this.props.score + 10
        this.props.dispatch(actions.correctDisplay());
        this.props.dispatch(actions.fetchSubmit('', '', score))
        break
      }
      // If not match, decrement score and fetch new word pair
      if (i === word2Array.length - 1 && !foundWord) {
        let score = this.props.score - 10
        this.props.dispatch(actions.fetchSubmit(this.props.wordId, 'false', score))
      }
    }
  }

  // Fetches new word pair on initial mounting of component
  componentDidMount() {
    // On initial mount, send empty strings and receive a random word pair back
    this.props.dispatch(actions.fetchSubmit('', '', ''))
  }

  // Toggles 'correct' state to false to hide 'Correct!' if state is true
  hideCorrect() {
    if (this.props.correct) {
        this.props.dispatch(actions.hideCorrect())
    }
  }

  render() {
    return (
        <div className = "Quiz">
          <div className="quiz-header">
            <img src="./src/img/huttlogo.png" />
            <a href="https://huttese-stone.herokuapp.com/logout"> <button className="logout-button">Log Out</button></a>
          </div>
          <Score score={this.props.score} />
          <Correct correct={this.props.correct} toggleCorrect={this.toggleCorrect} />
          <CurrentWord word1={this.props.word1} />
          <Answer checkAnswer={this.checkAnswer} hideCorrect={this.hideCorrect} word2={this.props.word2} answerInput={this.props.answerInput} />
      </div>
    )
  }

}


var mapStateToProps = (state, props) => {
  return {
      word1: state.word1,
      word2: state.word2,
      wordId: state.wordId,
      score: state.score,
      correct: state.correct,
      answerInput: state.answerInput
  }
}


export default connect(mapStateToProps)(QuizContainer)
