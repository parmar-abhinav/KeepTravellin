import * as ActionTypes from './ActionTypes';

export const Facility = (state  = { isLoading: false,
                                    errMess: null,
                                    facility:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FACILITY:
            return {...state, isLoading: false, errMess: null, facility: action.payload};

        case ActionTypes.FACILITY_LOADING:
            return {...state, isLoading: true, errMess: null, facility: []}

        case ActionTypes.FACILITY_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
    }
};