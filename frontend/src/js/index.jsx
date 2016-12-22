import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import router from './routes/router';
import store from './redux/store';

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Provider store={store}>
            {router}
		</Provider>, document.getElementById('root')
	)
});