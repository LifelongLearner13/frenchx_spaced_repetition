import React, { PropTypes } from 'react';

export default function Feedback(props) {

    const { word, wordPOS, wordPron, wordDef } = props;

    return (
        <div>Feedback Display</div>
  );
};

const propTypes = {
  word: PropTypes.string,
  wordPOS: PropTypes.string,
  wordPron: PropTypes.string,
  wordDef: PropTypes.string,
};
Feedback.propTypes = propTypes;
