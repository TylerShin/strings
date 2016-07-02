import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { fromJS } from 'immutable';
import { Tags } from '../api/tags';

export function loadTags() {
  return dispatch => {
    Tracker.autorun(() => {
      dispatch({
        type: 'FETCH_TAGS',
        tags: fromJS(Tags.find().fetch()),
      });
    });
  };
}

export function addTag({ tagName }) {
  return dispatch => {
    Meteor.call('tags.insert', tagName, (err) => {
      if (err) {
        alert(err.message);
      } else {
        dispatch({
          type: 'ADD_TAG',
        });
      }
    });
  };
}
