import { fromJS } from 'immutable';

export const INITIAL_TAGS = fromJS([]);
export default function currentUserReducer(state = INITIAL_TAGS, action) {
  switch (action.type) {
    case 'FETCH_TAGS': {
      return action.tags;
    }
    default:
      return state;
  }
}
