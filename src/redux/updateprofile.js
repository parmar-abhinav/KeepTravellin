import * as ActionTypes from './ActionTypes';

export const UpdateProfile = (state  = { isLoading: false,
                                    errMess: null,
                                    registration:{}}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_UPROFILE:
        return {...state, isLoading: false, errMess: null, registration: action.payload};

        case ActionTypes.UPROFILE_LOADING:
            return {...state, isLoading: true, errMess: null, registration: {}}

        case ActionTypes.UPROFILE_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
    }
};