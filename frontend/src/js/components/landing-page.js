import React, { PropTypes } from 'react';

export default function Landing(props) {

  const { onLoginClick } = props;

    return (
      <div className="Landing">
        <hgroup className="landing-header">
          <h1>
            <img className="landing-logo grow" src="img/huttstone_logo.png" alt="Hutt Stone" />
          </h1>
          <h2 className="landing-subtext fadeIn">Master the language of intergalactic <span className="italic">businessmen</span>!</h2>
        </hgroup>
        <button className="login-button fadeIn" onClick={onLoginClick}>Login / Sign Up</button>
      </div>
    );
};

const propTypes = {
  onLoginClick: PropTypes.func,
};
Landing.propTypes = propTypes;
