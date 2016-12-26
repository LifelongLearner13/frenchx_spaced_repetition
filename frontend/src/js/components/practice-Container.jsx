import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import store from '../redux/store.js';
import Navbar from './navbar';
import WordForm from './word-form';
import Feedback from './score';
import StatDisplay from './stat-display';

export class PracticeContainer extends React.Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault;


  }

  onChange(event) {

  }

  render() {

    let content = feedback ?
      (
        <section className="practice">
          <WordForm onSubmit={ this.onFormSubmit }
                    onChange={ this.onInputChange }
                    word={ this.props.currentWord }
                    wordID={ this.props.wordID } />
        </section>
      ) : (
        <Feedback feedback={ this.props.feedback }
                  previousWord={ this.props.previousWord }
                  wordPOS={ this.props.wordPOS }
                  wordPron={ this.props.wordPron }
                  wordDef={ this.props.wordDef } />
      );

    return (
      <div className="practice-area">
        <Navbar onLogoutClick={ this.props.onLogoutClick }/>
        <img src="img/jabba_business.png" alt="Jabba The Hutt wearing a suit" />
        { content }
        <StatDisplay score={ this.props.number }
                     correct={ this.props.correct }
                     incorrect={ this.props.incorrect }
        incorrect: PropTypes.number,/>
      </div>
    )
  }
};

const propTypes = {
    onLogoutClick: PropTypes.func,
    currentWord: PropTypes.string,
    wordId: PropTypes.string,
    feedback: PropTypes.string,
    previousWord: PropTypes.string,
    wordPOS: PropTypes.string,
    wordPron: PropTypes.string,
    wordDef: PropTypes.string,

};
PracticeContainer.propTypes = propTypes;

var mapStateToProps = (state, props) => {
    return {
        word: state.word,
        wordId: state.wordId,
        feedback: PropTypes.string,
        previousWord: PropTypes.string,
        wordPOS: PropTypes.string,
        wordPron: PropTypes.string,
        wordDef: PropTypes.string,
        score: state.score,
        correct: state.correct,
        incorrect: state.incorrect,
    };
};

export default connect(mapStateToProps)(PracticeContainer);
