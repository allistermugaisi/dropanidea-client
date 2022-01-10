import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './store/reducers';
import './index.css';
import App from './App';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const rootElement = document.getElementById('root');

render(
	<Provider
		store={createStoreWithMiddleware(
			rootReducer,
			window.__REDUX_DEVTOOLS_EXTENSION__ &&
				window.__REDUX_DEVTOOLS_EXTENSION__()
		)}
	>
		<Router>
			<App />
		</Router>
	</Provider>,
	rootElement
);
