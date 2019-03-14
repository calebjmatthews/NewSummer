import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store';
const store = configureStore();
import configureFontawesome from './fontawesome';
configureFontawesome();

import App from './containers/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(createStore);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
);
