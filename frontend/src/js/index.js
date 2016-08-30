import React from 'react';
import ReactDOM from 'react-dom';
import connect from 'react-redux.connect';
import Provider from 'react-redux.Provider';

import store from './store';

import Landing from './Landing';

import './style.css';

ReactDOM.render(
<Provider store={store}>
  <Landing />
</Provider>,
  document.getElementById('root')
);
