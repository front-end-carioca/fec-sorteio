import React from 'react';
import { trigger } from 'redial';
import { render } from 'react-dom';
import { Router, browserHistory, match } from 'react-router';
import { Provider } from 'react-redux';
import createStore from './store';
import routes from './routes';

const config = require('./config.json');
const restoreLocalStorage = require('../localStorage.json');
localStorage.setItem('listSorted', restoreLocalStorage.listSorted);

const initialState = {
  config
};

if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.location.href.match('localhost')) {
  const script = document.createElement('script');
  script.src = '//127.0.0.1:8081/livereload.js';
  document.body.appendChild(script);
}

const container = document.getElementById('app');
// const history = syncHistoryWithStore(browserHistory, store);
const store = createStore(initialState);
const { dispatch } = store;

window.store = store;

browserHistory.listen(location => {
  // Match routes based on location object:
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    // Get array of route handler components:
    const { components } = renderProps;

    // Define locals to be provided to all lifecycle hooks:
    const locals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,

      // Allow lifecycle hooks to dispatch Redux actions:
      dispatch
    };

    // Fetch mandatory data dependencies for 2nd route change onwards:
    trigger('fetch', components, locals);
  });
});

render((
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
), container);
