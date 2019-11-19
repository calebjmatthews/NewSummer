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

require('./images/wheat0.png');
require('./images/wheat1.png');
require('./images/wheat2.png');
require('./images/wheat3.png');
require('./images/wheat4.png');
require('./images/wheat5.png');
require('./images/wheat6.png');

// @ts-ignore
const createStoreWithMiddleware = applyMiddleware(createStore);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);
