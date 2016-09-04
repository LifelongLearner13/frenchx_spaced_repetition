var React = require('react');


var Score = React.createClass({
  render: function() {
    return (
      <div className="score" >
        <h2>Your score: {this.props.score}</h2>
      </div>
    );
  }
});

module.exports = Score;
