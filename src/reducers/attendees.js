import {
  ATTENDEES_REQUEST,
  ATTENDEES_SUCCESS
} from '../actions/attendees.type.js';
const initialState = {
  list: []
}

const attendees = (state = initialState, action) => {
  let list = []
  switch (action.type) {
    case ATTENDEES_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case ATTENDEES_SUCCESS:
      list = action.body.attendees ? action.body.attendees : [];
      return {
        ...state,
        list,
        isLoading: false
      };
    default:
      return state
  }
};

export default attendees;
