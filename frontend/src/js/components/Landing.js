var React = require('react');
var connect = require('react-redux').connect


var Landing = React.createClass({

  userLogin: function() {
    //TODO: authentication / login
  },
  
  render: function() {
    return (
      <div className="Landing">
        <div className="landing-header">
          <img className="hutt-header" src="./src/img/huttlogo.png" />
        </div>
        <div>
          <div className="jaba-div">
            <img className="jaba-pic" src="./src/img/jabapic_alpha.png" alt="JabaTheHutt" />
          </div>
          <h1 className="landing-text">Learn the language of intergalactic "businessmen"!</h1>
          <a href="https://huttese-stone.herokuapp.com/auth/google"><button className="login-button" type="submit">Login / Register</button></a>
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
