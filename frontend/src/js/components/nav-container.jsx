import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Navbar from './navbar';
import actions from '../redux/actions';
import AuthService from '../utils/auth-service';

export class NavbarContainer extends React.Component {
  constructor() {
    super();
    this.auth = new AuthService(
        'LpL1GiDax9bQAfvc6qBaYSyBDCowcVRY', 
        'sgregg.auth0.com');
      
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

  render() {
    return (
      <Navbar
        onLoginClick={this.handleLoginClick}
        onLogoutClick={this.handleLogoutClick}
        isAuthenticated={this.props.isAuthenticated}
        profile={this.props.profile}
      />
    );
  }
}

const propTypes = {
  profile: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  token: PropTypes.string,
};
NavbarContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.auth.profile,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(NavbarContainer);