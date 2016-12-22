import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import AppContainer from'../components/app-container'
import PracticeContainer from'../components/practice-Container';

const router = (
      <Router history={browserHistory}>
        <Route path="/" component={AppContainer}>
            <Route path="/practice" component={PracticeContainer} />
        </Route>
      </Router>
	);

export default router;
