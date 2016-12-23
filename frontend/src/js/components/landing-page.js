import React, { PropTypes } from 'react';
import { Link } from 'react-router'

export default function Landing(props) {

  const { onLoginClick } = props;

    return (
      <div className="Landing">
        <hgroup className="landing-header">
          <h1>
            <img className="landing-logo grow" src="img/huttstone_logo.png" alt="Hutt Stone" />
          </h1>
          <h2 className="landing-subtext fade-in">Master the language of intergalactic <span className="italic">businessmen</span>!</h2>
        </hgroup>
        <button className="login-button bl-base fade-in" onClick={onLoginClick}>Login / Sign Up</button>
        <Link className="about-link bl-base fade-in" to={'/about'}>About / Credits</Link>
      </div>
    );
};

const propTypes = {
  onLoginClick: PropTypes.func,
};
Landing.propTypes = propTypes;
