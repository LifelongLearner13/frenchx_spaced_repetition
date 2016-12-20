import React from 'react'


export default function Landing() {
    return (
      <div className="Landing">
        <div className="landing-header">
          <img className="hutt-header" src="huttlogo.png" alt="Hutte Stone" />
        </div>
        <div>
          <div className="jaba-div">
            <img className="jaba-pic" src="jabapic_alpha.png" alt="JabaTheHutt" />
          </div>
          <h2 className="landing-text">Learn the language of intergalactic "businessmen"!</h2>
        </div>
      </div>
    );
};