import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Route } from 'react-router';
// Import containers
import App from './app';
import Post from './post/post';
import Signup from './signup/signup';
import Signin from './signin/signin';
import TagAdmin from './admin/tag/tag';

const checkLogin = (nextState, replace, callback) => {
  if (!!Meteor.user() || Meteor.loggingIn()) {
    alert('이미 로그인되어 있습니다.');
    replace('/');
  }
  callback();
};

const adminCheck = (nextState, replace, callback) => {
  if (!!Meteor.user() && Meteor.user().profile.admin) {
    callback();
  }
  replace('/');
};

export default (
  <Route name="app" path="/" component={App}>
    <Route name="signup" path="signup" component={Signup} onEnter={checkLogin} />
    <Route name="signin" path="signin" component={Signin} onEnter={checkLogin} />
    <Route name="post" path="posts/:postId" component={Post} />
    <Route name="tag" path="tylor/tag" component={TagAdmin} />
  </Route>
);
