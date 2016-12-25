import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import Navbar from './navbar';
import Correct from './correct';
import CurrentWord from './currentword';
import Answer from './answer';
import Score from './score';

export class PracticeContainer extends React.Component {

  render() {
    return (
      <div className="practice-area">
        <Navbar onLogoutClick={this.props.onLogoutClick}/>
        <img src="img/jabba_business.png" alt="Jabba The Hutt wearing a suit" />
        <p>form</p>
        <p>states area</p>
      </div>
    )
  }
};

const propTypes = {
    onLogoutClick: PropTypes.func,
    word: PropTypes.string,
    wordId: PropTypes.string,
    score: PropTypes.number,
    correct: PropTypes.number,
    incorrect: PropTypes.number,
    answerInput: PropTypes.string
};
PracticeContainer.propTypes = propTypes;

var mapStateToProps = (state, props) => {
    return {
        word: state.word,
        wordId: state.wordId,
        score: state.score,
        correct: state.correct,
        incorrect: state.incorrect,
        answerInput: state.answerInput
    };
};

export default connect(mapStateToProps)(PracticeContainer);
