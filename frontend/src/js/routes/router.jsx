import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import AppContainer from'../components/app-container'
import PracticeContainer from'../components/practice-Container';

//const requireAuth = (nextState, replace) => {
//    if (nextState.location.hash) {
//        const hashString = nextState.location.hash;
//        console.log(hashString);
//    }
//};

const router = (
      <Router history={browserHistory}>
        <Route path="/" component={AppContainer}>
            <Route path="#access_token=:token" />
            <Route path="/practice" component={PracticeContainer} />
        </Route>
      </Router>
	);

export default router;
