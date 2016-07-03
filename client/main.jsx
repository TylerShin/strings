import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import withScroll from 'scroll-behavior';
import Immutable from 'immutable';
import rootReducer from '../imports/rootReducer';
import '../imports/startup/accounts-config.js';
import routes from '../imports/routes';
import { loadUser } from '../imports/actions';

const routerMid = routerMiddleware(browserHistory);

// Set logger middleware to convert from ImmutbaleJS to plainJS
const logger = createLogger({
  stateTransformer: (state) => {
    const newState = {};
    for (const i of Object.keys(state)) {
      if (Immutable.Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    }
    return newState;
  },
});

// Create store
const store = createStore(
  rootReducer,
  applyMiddleware(routerMid, thunkMiddleware, logger)
);

const appHistory = withScroll(syncHistoryWithStore(
    browserHistory,
    store
  ));

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <Router history={appHistory} children={routes} />
    </Provider>
    ,
    document.getElementById('render-target'));
  store.dispatch(loadUser());
});
