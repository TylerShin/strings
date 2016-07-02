import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import '../imports/startup/accounts-config.js';
import routes from '../imports/routes';

Meteor.startup(() => {
  render(
    <Router history={browserHistory} children={routes} />,
    document.getElementById('render-target'));
});
