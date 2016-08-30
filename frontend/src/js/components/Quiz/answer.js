// import React, { Component } from 'react';
// import './index.css';
var React = require('react');

//class Cards extends Component {
var Answer = React.createClass( {
  render: function() {
    return (
    	<div>
    		<input type="text" placeholder="Enter Your Answer" />
    		<button type="Submit" onClick={this.props.checkAnswer} >Submit</button>
    	</div>
    );
  }
};

module.exports = Answer;