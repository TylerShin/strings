import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import currentUser, { INITIAL_CURRENT_USER } from './reducers/currentUser';
import tags, { INITIAL_TAGS } from './reducers/tags';
import posts, { INITIAL_POSTS } from './reducers/posts';
import post, { INITIAL_POST } from './reducers/post';
import subPosts, { INITIAL_SUBPOSTS } from './reducers/subPosts';
import comments, { INITIAL_COMMENTS } from './reducers/comments';

export const initialState = {
  currentUser: INITIAL_CURRENT_USER,
  tags: INITIAL_TAGS,
  posts: INITIAL_POSTS,
  post: INITIAL_POST,
  subPosts: INITIAL_SUBPOSTS,
  comments: INITIAL_COMMENTS,
};

const rootReducer = combineReducers({
  currentUser,
  tags,
  posts,
  post,
  subPosts,
  comments,
  routing: routerReducer,
});

export default rootReducer;
