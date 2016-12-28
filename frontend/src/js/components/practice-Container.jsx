import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import store from '../redux/store.js';
import Navbar from './navbar';
import WordForm from './word-form';
import Feedback from './feedback';
import StatDisplay from './stat-display';

export class PracticeContainer extends React.Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(userInput, id) {
    console.log(`onSubmit userInput -> ${userInput}`)
  }

  render() {

    const { feedback,
            currentWord,
            currentWordID,
            previousWord,
            previousWordPOS,
            previousWordPron,
            previousWordDef,
            score,
            correct,
            incorrect } = this.props;

    let content = feedback ?
      (
        <Feedback feedback={ feedback }
                  word={ previousWord }
                  wordPOS={ previousWordPOS }
                  wordPron={ previousWordPron }
                  wordDef={ previousWordDef } />
      ) : (
        <WordForm onSubmit={ this.onSubmit }
                  word={ currentWord }
                  wordID={ currentWordID } />
      );

    return (
      <div className="practice-container">
        <Navbar onLogoutClick={ this.props.onLogoutClick }/>
        <div className="practice-area">
          <img className="jabba-suit one-third" src="img/jabba_business.png" alt="Jabba The Hutt wearing a suit" />
          { content }
        </div>
      </div>
    )
  }
};

const propTypes = {
    onLogoutClick: PropTypes.func,
    currentWord: PropTypes.string,
    currentWordId: PropTypes.number,
    feedback: PropTypes.bool,
    previousWord: PropTypes.string,
    previousWordPOS: PropTypes.string,
    previousWordPron: PropTypes.string,
    previousWordDef: PropTypes.string,
};
PracticeContainer.propTypes = propTypes;

var mapStateToProps = (state, props) => {
    return {
        currentWord: state.practice.currentWord,
        currentWordID: state.practice.currentWordID,
        feedback: state.practice.feedback,
        previousWord: state.practice.previousWord,
        previousWordPOS: state.practice.previousWordPOS,
        previousWordPron: state.practice.previousWordPron,
        previousWordDef: state.practice.previousWordDef,
    };
};

export default connect(mapStateToProps)(PracticeContainer);
