import * as ActionTypes from './ActionTypes';

export const Request = (state  = { isLoading: false,
                                    errMess: null,
                                    request:{}}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_REQUEST:
            return {...state, isLoading: false, errMess: null, request: action.payload};

        case ActionTypes.REQUEST_LOADING:
            return {...state, isLoading: true, errMess: null, request: []}

        case ActionTypes.REQUEST_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
    }
};