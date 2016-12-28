import React, { PropTypes } from 'react';

export default function StatDisplay(props) {

    const { correct, incorrect, score } = props;

    return (
        <div>Stat Display</div>
  );
};

const propTypes = {
  correct: PropTypes.number,
  incorrect: PropTypes.number,
  score: PropTypes.number,
};
StatDisplay.propTypes = propTypes;
