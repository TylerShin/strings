import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import useScroll from 'react-router-scroll';
import Immutable from 'immutable';
import rootReducer from '../imports/rootReducer';
import '../imports/startup/accounts-config.js';
import routes from '../imports/routes';
import { loadUser } from '../imports/actions';

// SETUP CLOUDINARY
$.cloudinary.config({ // eslint-disable-line
  cloud_name: 'pengyou',
});


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
  applyMiddleware(thunkMiddleware, logger)
);

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <Router history={browserHistory} children={routes} render={applyRouterMiddleware(useScroll())} />
    </Provider>
    ,
    document.getElementById('render-target'));
  store.dispatch(loadUser());
});
