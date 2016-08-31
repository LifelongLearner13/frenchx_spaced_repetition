var React = require('react');


var CurrentWord = React.createClass({
  render: function() {
    return (
      <div className="current-word">
        <h1>{this.props.word1}</h1>
      </div>
    );
  }
});

module.exports = CurrentWord;
