// import React, { Component } from 'react';
// import './index.css';
var React = require('react');

//class Cards extends Component {
var quizContainer = React.createClass( {
  render: function() {
    return (
      <div className="Quiz">
        <div className="Quiz-header">
          <h2>FrenchX Header</h2>
          <button className="logOut" type="submit" placeholder="Log Out"></button>
        </div>
        <CurrentWord word={this.props.word} />      
        <Answer />
        <Score />
        <Correct />
      </div>

    );
  }
};


// let mapStateToProps = (state, props) => {
//   return {
//     state: state
//   }
// }

// let Cards = connect(mapStateToProps)(Cards);

// export default Cards;

var mapStateToProps = function(state, props) {
  return {
    state: state
  }
};

var Container = connect(mapStateToProps)(Quiz);
module.exports = Container;
