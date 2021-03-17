import * as ActionTypes from './ActionTypes';

export const Registration = (state  = { isLoading: false,
                                    errMess: null,
                                    registration:{}}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_REGISTRATION:
        return {...state, isLoading: false, errMess: null, registration: action.payload};

        case ActionTypes.REGISTRATION_LOADING:
            return {...state, isLoading: true, errMess: null, registration: []}

        case ActionTypes.REGISTRATION_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
    }
};