import { Meteor } from 'meteor/meteor';
import { push } from 'react-router-redux';

const addPost = () => {
  return {
    type: 'ADD_POST',
  };
};

export const insertPost = ({ title, content, tagId }) => {
  return (dispatch) => {
    Meteor.call('posts.insert', {
      title,
      content,
      tagId,
    }, (err) => {
      if (err) {
        alert(err.message);
      } else {
        dispatch(addPost());
        dispatch(push(`/posts/${tagId}`));
      }
    });
  };
};
