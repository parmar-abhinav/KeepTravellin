import * as ActionTypes from './ActionTypes';

export const Wish = (state  = { isLoading: false,
                                    errMess: null,
                                    wish:{}}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_WISH:
            return {...state, isLoading: false, errMess: null, wish: action.payload};

        case ActionTypes.WISH_LOADING:
            return {...state, isLoading: true, errMess: null, wish: []}

        case ActionTypes.WISH_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
    }
};