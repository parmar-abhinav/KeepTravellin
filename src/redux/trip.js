import * as ActionTypes from './ActionTypes';

export const Trip = (state  = { isLoading: false,
                                    errMess: null,
                                    trip:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TRIP:
            return {...state, isLoading: false, errMess: null, trip: action.payload};

        case ActionTypes.TRIP_LOADING:
            return {...state, isLoading: true, errMess: null, trip: []}

        case ActionTypes.TRIP_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
    }
};