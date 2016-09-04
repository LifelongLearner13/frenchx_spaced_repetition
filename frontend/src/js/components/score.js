import React from 'react'


class Score extends React.Component {

  render() {
    return (
      <div className="score" >
        <h2>Your score: {this.props.score}</h2>
      </div>
    )
  }

}


export default Score
