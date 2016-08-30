import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './Landing';
import Cards from './Cards';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
	<Cards />
	</Provider>,
  document.getElementById('quiz')
);
