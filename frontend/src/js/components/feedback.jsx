import React, { PropTypes } from 'react';

export default function Feedback(props) {

    const { feedback, word, wordPOS, wordPron, wordDef } = props;

    let userFeedback = feedback ? 'Correct' : 'Incorrect';

    return (
        <section className="feedback two-thirds">
          <h2 className={ userFeedback.toLowerCase() }>{ userFeedback }</h2>
          <dl className="word-def`">
            <dt><dfn>{ word }</dfn></dt>
            <dd>
              <p className="word-pron">({ wordPron })</p>
              <p className="word-def"><span className="bold">{ wordPOS }</span> { wordDef }</p>
            </dd>
          </dl>
        </section>
  );
};

const propTypes = {
  feedback: PropTypes.bool,
  word: PropTypes.string,
  wordPOS: PropTypes.string,
  wordPron: PropTypes.string,
  wordDef: PropTypes.string,
};
Feedback.propTypes = propTypes;
