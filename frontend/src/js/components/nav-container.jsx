import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Navbar from './navbar';
import actions from '../redux/actions';
import AuthService from '../utils/auth-service';
import authConfig from '../config/auth0.js'

export class NavbarContainer extends React.Component {
    constructor() {
        super();
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

    render() {
        return (
        <Navbar
            onLoginClick={this.handleLoginClick}
            onLogoutClick={this.handleLogoutClick}
            isAuthenticated={this.props.isAuthenticated}
            profile={this.props.profile}
        />
        );
    };
};

const propTypes = {
    profile: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    token: PropTypes.string,
};
NavbarContainer.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        profile: state.auth.profile,
        isAuthenticated: state.auth.isAuthenticated,
        token: state.auth.token,
    };
};

export default connect(mapStateToProps)(NavbarContainer);