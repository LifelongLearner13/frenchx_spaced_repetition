import React, { PropTypes } from 'react';

export default function StatDisplay(props) {

    const { correct, incorrect, score } = props;

    return (
        <section className="stat-display one-third">
          <h2>Progress</h2>

          <p>Overall Score: <span className="score">{ score }</span></p>
          <p>Correct: <span className="score">{ correct }</span></p>
          <p>Incorrect: <span className="score">{ incorrect }</span></p>
        </section>
  );
};

const propTypes = {
  correct: PropTypes.number,
  incorrect: PropTypes.number,
  score: PropTypes.number,
};
StatDisplay.propTypes = propTypes;
