import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import AppContainer from'../components/app-container'
import QuizContainer from'../components/Quiz-Container';

const routes = (
      <Router history={hashHistory}>
        <Route path="/" component={AppContainer}>
            <Route path="access_token=:token" />
            <Route path="/quiz" component={QuizContainer} />
        </Route>
      </Router>
	);

export default routes;
