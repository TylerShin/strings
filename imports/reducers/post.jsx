import { Map } from 'immutable';

export const INITIAL_POST = Map({});
export default function postReducer(state = INITIAL_POST, action) {
  switch (action.type) {
    case 'FETCH_POST': {
      return action.post;
    }
    default:
      return state;
  }
}
