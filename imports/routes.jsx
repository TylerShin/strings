import React from 'react';
import { Route } from 'react-router';
// Import containers
import App from './app';
import Post from './post/post';
import Signup from './signup/signup';

export default (
  <Route name="app" path="/" component={App}>
    <Route name="signup" path="signup" component={Signup} />
    <Route name="post" path="posts/:postId" component={Post} />
  </Route>
);
