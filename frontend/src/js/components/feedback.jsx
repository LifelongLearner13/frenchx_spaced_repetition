import React, { PropTypes } from 'react';

export default function Feedback(props) {

    const { feedback, word, wordPOS, wordPron, wordDef } = props;

    let userFeedback = feedback ? 'Correct' : 'Incorrect';

    return (
        <section className="feedback">
          <h2>{ userFeedback }</h2>
          <dl className="word-def`">
            <dt lang="en-GB"><dfn>{ word }</dfn></dt>
            <dd>
              <h3>{ wordPron }</h3>
              <p>{`${wordPOS} ${wordDef}`}</p>
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
