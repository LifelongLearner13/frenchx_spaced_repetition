//import React, { Component } from 'react';
//import './index.css';
var React = require('react');

//class Landing extends Component {
var Landing = React.createClass( {
  userLogin: function() {
    //TODO: authentication / login
  },
  render: function() {
    return (
      <div className="Landing">
        <div className="Landing-header">
          <h2>FrenchX Header</h2>
        </div>
        <div className="Landing-login">
          <button className="Login" type="submit" onClick={this.userLogin} placeholder="Login With Google"></button>
        </div>
      </div>
    );
  }
)};


/* let mapStateToProps = (state, props) => {
  return {
    state: state
  }
}

let Landing = connect(mapStateToProps)(Landing);

export default Landing; */

var mapStateToProps = function(state, props) {
  return {
    state: state
  }
};

var Container = connect(mapStateToProps)(Landing);
module.exports = Container;
