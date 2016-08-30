var React = require('react');

var Score = React.createClass({
  render: function() {
    return (
      <div>
        <h2>You're current score is: {this.props.score}</h2>
      </div>
    );
  }
});

module.exports = Score;