import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
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
    this.onNext = this.onNext.bind(this);
  }

  onSubmit(userInput, id) {
    store.dispatch(actions.fetchWord(userInput, id));
  }

  // Load WordForm with the next word
  onNext() {
    store.dispatch(actions.nextWord());
  }

  render() {

    const {
      isCorrect,
      showFeedback,
      currentWord,
      currentWordID,
      previousWord,
      previousWordPOS,
      previousWordPron,
      previousWordDef
    } = this.props;

    // Could have been accomplished via nested components or routes.
    // I choose to nest components with a condition because bookmarking
    // a /feedback route doesn't make sense with the current app logic.
    // Drawback: have to fire action to switch between components
    let content = showFeedback
      ? (<Feedback isCorrect={isCorrect} word={previousWord} wordPOS={previousWordPOS} wordPron={previousWordPron} wordDef={previousWordDef} onNext={this.onNext}/>)
      : (<WordForm onSubmit={this.onSubmit} word={currentWord} wordID={currentWordID}/>);

    return (
      <div className="practice-container">
        <Navbar onLogoutClick={this.props.onLogoutClick}/>
        <div className="practice-area">
          {content}
          <div className="col-2">
            <img className="jabba-suit" src="img/jabba_business.png" alt="Jabba The Hutt wearing a suit"/>
          </div>
        </div>
      </div>
    )
  }
};

const propTypes = {
  onLogoutClick: PropTypes.func,
  currentWord: PropTypes.string,
  currentWordId: PropTypes.number,
  showFeedback: PropTypes.bool,
  isCorrect: PropTypes.bool,
  previousWord: PropTypes.string,
  previousWordPOS: PropTypes.string,
  previousWordPron: PropTypes.string,
  previousWordDef: PropTypes.string
};
PracticeContainer.propTypes = propTypes;

var mapStateToProps = (state, props) => {
  return {
    currentWord: state.practice.currentWord,
    currentWordID: state.practice.currentWordID,
    showFeedback: state.practice.showFeedback,
    previousWord: state.practice.previousWord,
    previousWordPOS: state.practice.previousWordPOS,
    previousWordPron: state.practice.previousWordPron,
    previousWordDef: state.practice.previousWordDef
  };
};

export default connect(mapStateToProps)(PracticeContainer);
