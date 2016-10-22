import {
  ATTENDEES_REQUEST,
  ATTENDEES_SUCCESS,
  ATTENDEES_ERROR
} from './attendees.type';
import fetch from 'isomorphic-fetch';

const makeUrl = ({eventickAPIUrl, eventId, endpoint}) => {
  return `${eventickAPIUrl}/${eventId}/${endpoint}`;
}

export const getAttendees = () => {
  return {
    types: [ATTENDEES_REQUEST, ATTENDEES_SUCCESS, ATTENDEES_ERROR],
    callAPI: (getState) => {
      const state = getState();
      const url = makeUrl(state.config);
      return fetch(url, {
        headers: {
          ...state.config.headersApi
        }
      })
      .then(response => {
        return response.json();
      })
    }
  }
}
