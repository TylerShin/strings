import { Meteor } from 'meteor/meteor';

export function addSubPosts({ content, tagId, postId, textareaDom }) {
  return (dispatch) => {
    Meteor.call('subPosts.insert', { content, tagId, postId }, (err) => {
      if (err) {
        alert(err.message);
      } else {
        dispatch({
          type: 'ADD_SUBPOST',
        });
        textareaDom.value = '';
      }
    });
  };
}
