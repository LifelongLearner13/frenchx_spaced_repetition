var React = require('react');


var Correct = React.createClass({

  render: function() {

    // If answer isn't correct (state is false) , add 'hidden' class to 'correct' display.
    var classes = 'correct-display ';
    if (!this.props.correct) {
      classes += 'hidden';
    }

    return (
      <div className="correct-div">
        <h1 className={classes}>Correct!</h1>
      </div>
    );
  }
});

module.exports = Correct
