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
          <h2>HutteStone Header</h2>
        </div>
        <div className="Landing-login">
          <a href="https://huttese-stone.herokuapp.com/auth/google"><button className="Login" type="submit">Login / Register</button></a>
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
