const callAPIMiddleware = ({ dispatch, getState }) => {
  return next => action => {
    if (!action) return;

    const {
      types,
      details = {},
      callAPI,
      shouldCallAPI = () => true,
      payload = {},
    } = action;

    if (!types) {
      // Normal action: pass it on
      return next(action);
    }

    if ( !Array.isArray(types) || types.length !== 3 || !types.every(type => typeof type === 'string') ) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected fetch to be a function.');
    }

    if (!shouldCallAPI(getState)) {
      return;
    }

    const [requestType, responseSuccessType, responseErrorType] = types;

    dispatch(Object.assign({}, payload, {
      type: requestType,
      details,
    }));

    return callAPI(getState, dispatch)
      .then(
        response => {
          const responseObj = Object.assign({}, payload, {
            type: responseSuccessType,
            body: response
          })

          dispatch(responseObj);

          return responseObj;
        },
        error => {
          const responseError = Object.assign({}, payload, {
            type: responseErrorType,
            status: 'error',
            error
          })

          dispatch(responseError);

          return responseError;
        }
      );
  };
}

export default callAPIMiddleware;
