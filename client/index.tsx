import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import configureStore from './store';
const store = configureStore();
import App from './components/app';

require('./styles/root.css');
require('./styles/card.css');
require('./styles/modal.css');
require('./styles/seed.css');
require('./styles/header.css');
require('./styles/field.css');
require('./styles/particle.css');

// @ts-ignore
const createStoreWithMiddleware = applyMiddleware(createStore);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);
