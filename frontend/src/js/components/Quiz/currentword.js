// import React, { Component } from 'react';
// import './index.css';
var React = require('react');

//class Cards extends Component {
var CurrentWord = React.createClass( {
  render: function() {
    return (
      <div className="current-word">
        <p>{this.props.word}</p>
      </div>
    );
  }
};

module.exports = CurrentWord;
