import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reducer from './store/reducer';

import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const store = createStore(reducer,composeWithDevTools(applyMiddleware(logger,thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

