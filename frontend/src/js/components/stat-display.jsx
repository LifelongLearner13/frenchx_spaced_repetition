import React, { PropTypes } from 'react';

export default function StatDisplay(props) {

    const { correct, incorrect, score } = props;

    return (
        <section className="stat-display">
          <h2>Progress</h2>

          <h3>Overall Score: <span className="score">{ score }</span></h3>
          <h3>Successful answers in current session: <span className="score">{ correct }</span></h3>
          <h3>Missed Words in current session: <span className="score">{ incorrect }</span></h3>
        </section>
  );
};

const propTypes = {
  correct: PropTypes.number,
  incorrect: PropTypes.number,
  score: PropTypes.number,
};
StatDisplay.propTypes = propTypes;
