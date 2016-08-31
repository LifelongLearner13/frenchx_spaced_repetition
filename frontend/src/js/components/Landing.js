var React = require('react');
var connect = require('react-redux').connect


var Landing = React.createClass({

  userLogin: function() {
    //TODO: authentication / login
  },
  
  render: function() {
    return (
      <div className="Landing">
        <div className="Landing-header">
          <h2>FrenchX Header</h2>
        </div>
        <div className="Landing-login">
          <button className="Login" type="submit" onClick={this.userLogin} placeholder="Login With Google"></button>
        </div>
      </div>
    );
  }
});


var mapStateToProps = function(state, props) {
  return {

  }
};

var Container = connect(mapStateToProps)(Landing);
module.exports = Container;
