import React from 'react'


class CurrentWord extends React.Component {

  render() {
    return (
      <div className="current-word">
        <h1>{this.props.word1}</h1>
      </div>
    )
  }

}


export default CurrentWord
