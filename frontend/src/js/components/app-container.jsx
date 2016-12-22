import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import NavContainer from './nav-container';
import LandingPage from './landing-page';

// Display the landing page if no one is logged in or
// render the practice area. 
export function AppContainer(props) {
  const display = !props.isAuthenticated ? (
    <LandingPage />
  ) : (
    props.children
  );

  return (
    <div>
      <NavContainer />
      {display}
    </div>
  );
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