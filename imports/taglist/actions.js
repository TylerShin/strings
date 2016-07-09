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

export function closeTagList() {
  return {
    type: 'TOGGLE_TAGS',
  };
}
