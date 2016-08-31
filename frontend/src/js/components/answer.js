// import React, { Component } from 'react';
// import './index.css';
var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../actions');

//class Cards extends Component {
var Answer = React.createClass({
  checkAnswer: function() {
    // TODO: Needs to dispatch action that sends boolean for right/wrong answer
    var answer = this.refs.answer.value;
    console.log(answer, '<-- Answer value');
    
    if (answer === this.props.english) {
      this.props.dispatch(actions.correctDisplay());
      this.props.dispatch(actions.incrementScore());
    } else {
      this.props.dispatch(actions.decrementScore());
    }
    this.props.dispatch(actions.fetchWords());
  },	

  render: function() {
    return (
    	<div>
    		<input type="text" ref="answer" placeholder="Enter Your Answer" />
    		<button type="Submit" onClick={this.checkAnswer} >Submit</button>
    	</div>
    );
  }
});

var mapStateToProps = function(state, props) {
	return {
		state: state
	}
}

var Container = connect(mapStateToProps)(Answer)
module.exports = Container;