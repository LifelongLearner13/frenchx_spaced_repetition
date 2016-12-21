import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import Correct from './correct'
import CurrentWord from './currentword'
import Answer from './answer'
import Score from './score'


export class PracticeContainer extends React.Component {

//  // We need to manually bind instance methods in ES6
//  constructor(props) {
//    super(props)
//    this.checkAnswer = this.checkAnswer.bind(this)
//    this.hideCorrect = this.hideCorrect.bind(this)
//  }
//
//  checkAnswer(answer) {
//    let word2Array = this.props.word2;
//    let foundWord;
//
//    // Loops through English words array for user's answer.
//    for (var i = 0; i < word2Array.length; i++) {
//      // If a match, show 'Correct!', increase score, fetch new words, submit to backend
//      if (answer.toLowerCase() === word2Array[i].toLowerCase()) {
//        foundWord = true;
//        let score = this.props.score + 10
//        this.props.dispatch(actions.correctDisplay());
//        this.props.dispatch(actions.fetchSubmit('', '', score))
//        break
//      }
//      // If not match, decrement score and fetch new word pair
//      if (i === word2Array.length - 1 && !foundWord) {
//        let score = this.props.score - 10
//        this.props.dispatch(actions.fetchSubmit(this.props.wordId, 'false', score))
//      }
//    }
//  }
//
//  // Fetches new word pair on initial mounting of component
//  componentDidMount() {
//    // On initial mount, send empty strings and receive a random word pair back
//    this.props.dispatch(actions.fetchSubmit('', '', ''))
//  }
//
//  // Toggles 'correct' state to false to hide 'Correct!' if state is true
//  hideCorrect() {
//    if (this.props.correct) {
//        this.props.dispatch(actions.hideCorrect())
//    }
//  }

  render() {
    return (
        <div className = "Quiz">
          <h1>practice-Container</h1>
      </div>
    )
  }

}


var mapStateToProps = (state, props) => {
  return {
      word: state.word,
      wordId: state.wordId,
      score: state.score,
      correct: state.correct,
      incorrect: state.incorrect,
      answerInput: state.answerInput,
  }
}


export default connect(mapStateToProps)(PracticeContainer)
