import React, { PropTypes } from 'react';

export default function Feedback(props) {

    const { isCorrect, word, wordPOS, wordPron, wordDef, onNext } = props;

    let userFeedback = isCorrect ? 'Correct' : 'Incorrect';

    return (
        <section className="feedback col-1">
          <h2 className={ userFeedback.toLowerCase() }>{ userFeedback }</h2>
          <dl className="word-def`">
            <dt><dfn>{ word }</dfn></dt>
            <dd>
              <p className="word-pron">({ wordPron })</p>
              <p className="word-def"><span className="bold">{ wordPOS }</span> { wordDef }</p>
            </dd>
          </dl>
          <button className="check-button bl-base" type="submit" onClick={ onNext }>Next</button>
        </section>
  );
};

const propTypes = {
  isCorrect: PropTypes.bool,
  word: PropTypes.string,
  wordPOS: PropTypes.string,
  wordPron: PropTypes.string,
  wordDef: PropTypes.string,
  onNext: PropTypes.func,
};
Feedback.propTypes = propTypes;
