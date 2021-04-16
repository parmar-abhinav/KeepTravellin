import * as ActionTypes from './ActionTypes';

export const Check = (state  = { isLoading: false,
                                    errMess: null,
                                    check:{}}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_USER:
            return {...state, isLoading: false, errMess: null, check: action.payload};

        case ActionTypes.USER_LOADING:
            return {...state, isLoading: true, errMess: null, check: []}

        case ActionTypes.USER_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
    }
};