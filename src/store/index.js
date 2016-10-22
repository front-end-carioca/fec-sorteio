import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import callAPIMiddleware from '../middleware/callAPImiddleware';

const configureStore = preloadedState => {
  const middlewares = [thunk, callAPIMiddleware];
  const store = createStore(
    reducers,
    preloadedState,
    applyMiddleware(
      ...middlewares
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store;
}
export default configureStore;
