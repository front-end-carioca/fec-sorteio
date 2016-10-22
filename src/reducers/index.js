import { combineReducers } from 'redux';
import attendees from './attendees';
import config from './config';

const reducers = combineReducers({
  attendees,
  config
});

export default reducers
