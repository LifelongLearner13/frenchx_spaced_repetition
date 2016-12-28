import React, { PropTypes } from 'react';

export default class WordForm extends React.Component {

  constructor(props) {
    super(props);
    console.log('WordForm props -> ', props)
    // After some research I decided to handle the form input as
    // suggested in the React Docs. There is no value in firing a new
    // action everytime a user types a character in the text field.
    // In addition, I didn't want to setup React Form
    // (http://redux-form.com/6.4.1/) for one text input.
    // StackOverflow post discussing alternatives:
    // http://stackoverflow.com/questions/34952530/i-am-using-redux-should-i-manage-controlled-input-state-in-the-redux-store-or-u
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.value, this.state.id);
    this.setState({
      value: '',
    });
  }

  render () {
    return (
      <section className="practice-area two-thirds">
        <form className="practice-form" onSubmit={ this.handleSubmit }>
          <label>
            { this.props.word }
            <input type="text" id={ this.state.wordID } value={ this.state.value } onChange={ this.handleChange } />
          </label>

            <input type="submit" value="Submit" />
        </form>
      </section>
    )
  }
};

const propTypes = {
    onSubmit: PropTypes.func,
    word: PropTypes.string,
    wordID: PropTypes.number,
};
WordForm.propTypes = propTypes;
