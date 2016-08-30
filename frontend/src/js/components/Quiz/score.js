class WordCount extends Component {
  render() {
    return (
      <div className="Landing">
        <div className="Landing-header">
          <h2>FrenchX Header</h2>
        </div>
        <div className="Landing-login">
          <button type="submit" onClick={this.userLogin} placeholder="Login With Google"></button>
        </div>
      </div>
    );
  }
}