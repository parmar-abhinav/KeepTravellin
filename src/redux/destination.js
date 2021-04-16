import * as ActionTypes from './ActionTypes';

export const Destination = (state  = { isLoading: false,
                                    errMess: null,
                                    destination:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DESTINATION:
            return {...state, isLoading: false, errMess: null, destination: action.payload};

        case ActionTypes.DESTINATION_LOADING:
            return {...state, isLoading: true, errMess: null, destination: []}

        case ActionTypes.DESTINATION_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
    }
};