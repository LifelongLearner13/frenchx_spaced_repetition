import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import LandingPage from './landing-page';
import actions from '../redux/actions';
import AuthService from '../utils/auth-service';
import authConfig from '../config/auth0.js';

export class AppContainer extends React.Component {
  constructor(props) {
      super(props);
      this.auth = new AuthService(authConfig.clientID, authConfig.domain);

      // auth-lock does not fire the authenticated event when
      // user signs in with email and password.
      // This hack trys to solve the problem by monitoring
      // browserHistory for an appropriate hash.
      // Similar, if not exact bug (There is no official fix):
      // https://github.com/auth0/lock/issues/527
      browserHistory.listen(location => {
          if (/access_token/.test(location.hash) || /error/.test(location.hash)) {
              this.auth.loginHash(location.hash);
          }
      });

      this.handleLoginClick = this.handleLoginClick.bind(this);
      this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  componentDidMount() {
      this.auth.loggedIn();
  }

  handleLoginClick() {
      this.auth.login();
  }

  handleLogoutClick() {
      this.auth.logout();
  }

  // Display the landing page if no one is logged in or
  // render the practice area.
  render() {

    const isAuthenticated = this.props.isAuthenticated;
    const children = this.props.children;

    return (
      <div>
        {isAuthenticated ? (
          children && React.cloneElement(children, {onLogoutClick: this.handleLogoutClick})
        ) : (
          <LandingPage onLoginClick={this.handleLoginClick} />
        )}
      </div>
    );
  }
};

// typechecking the props passed to the component
// https://facebook.github.io/react/docs/typechecking-with-proptypes.html
const propTypes = {
  isAuthenticated: PropTypes.bool,
  children: PropTypes.object,
};
AppContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(AppContainer);
