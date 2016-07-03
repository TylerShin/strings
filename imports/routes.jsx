import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Route } from 'react-router';
// Import containers
import App from './app';
import Post from './posts/post/post';
import Posts from './posts/posts';
import WritingForm from './writingForm/writingForm';
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
    <Route path="/signup" component={Signup} onEnter={checkLogin} />
    <Route path="/signin" component={Signin} onEnter={checkLogin} />
    <Route path="/posts/:tagId" component={Posts} />
    <Route path="/posts/:tagId/new" component={WritingForm} />
    <Route path="/posts/:tagId/:postId" component={Post} />
    <Route path="/tylor/tag" component={TagAdmin} />
  </Route>
);
