var React = require('react');


var Correct = React.createClass({

  render: function() {

    // If answer isn't correct (state is false) , add 'hidden' class to 'correct' display. 
    var classes = 'correct-display ';
    if (!this.props.correct) {
      classes += 'hidden';
    }

    return (
      <div className={classes}>
        <h1>Correct!</h1>
        <button onClick={this.props.toggleCorrect} >X</button>
      </div>
    );
  }
});

module.exports = Correct