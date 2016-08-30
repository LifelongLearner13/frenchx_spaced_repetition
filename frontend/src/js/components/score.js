var React = require('react');

var Score = React.createClass({
  render: function() {
    return (
      <div>
        <h2>You're score: {this.props.score}</h2>
      </div>
    );
  }
});

module.exports = Score;