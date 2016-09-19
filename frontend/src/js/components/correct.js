import React from 'react'


class Correct extends React.Component {

  render() {
    // If answer isn't correct (state is false) , add 'hidden' class to 'correct' display.
    let classes = 'correct-display ';
    if (!this.props.correct) {
      classes += 'hidden';
    }

    return (
      <div className="correct-div">
        <h1 className={classes}>Correct!</h1>
      </div>
    )
  }

}


module.exports = Correct
