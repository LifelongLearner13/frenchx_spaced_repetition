var React = require('react');

var Correct = React.createClass({
  // TODO: If answer is correct, toggle css class to unhide
  render: function() {
    var classes = 'correct-display ';
    if (!this.props.correct) {
      classes += 'hidden';
    }

    return (
      <div className={classes}>
        <h1>Correct!</h1>
      </div>
    );
  }
});

module.exports = Correct