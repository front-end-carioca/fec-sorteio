import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import App from '../components/App';
import { getAttendees } from '../actions/attendees.action';

const hooks = {
  fetch: ({ dispatch }) => {
    dispatch(getAttendees());
  }
};

const handleSearchAttends = (state) => searchKey => {
  const list = state.attendees.list.filter(attend => !attend.checked_at);
  if (!searchKey || searchKey.length > 3) return list;
  return list.filter(attend => {
    const reg = new RegExp(searchKey.toLowerCase(), 'gi');
    // return attend.email === email
    return reg.test(attend.email) || reg.test(attend.name.toLowerCase())
  });
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  handleSearchAttends: handleSearchAttends(state),
  allAttendees: state.attendees.list.filter(attend => attend.checked_at),
  list: handleSearchAttends(state)()
})



export default provideHooks(hooks)(connect(mapStateToProps)(App));
