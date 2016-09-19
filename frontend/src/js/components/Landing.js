import React from 'react'


class Landing extends React.Component {

  render() {
    return (
      <div className="Landing">
        <div className="landing-header">
          <img className="hutt-header" src="huttlogo.png" />
        </div>
        <div>
          <div className="jaba-div">
            <img className="jaba-pic" src="jabapic_alpha.png" alt="JabaTheHutt" />
          </div>
          <h1 className="landing-text">Learn the language of intergalactic "businessmen"!</h1>
          <a href="https://huttese-stone.herokuapp.com/auth/google"><button className="login-button" type="submit">Login / Register</button></a>
        </div>
      </div>
    )
  }

}


export default Landing
