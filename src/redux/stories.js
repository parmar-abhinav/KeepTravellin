import * as ActionTypes from './ActionTypes';

export const Stories = (state  = { isLoading: false,
                                    errMess: null,
                                    stories:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_STORIES:
            return {...state, isLoading: false, errMess: null, stories: action.payload};

        case ActionTypes.STORIES_LOADING:
            return {...state, isLoading: true, errMess: null, stories: []}

        case ActionTypes.STORIES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
    }
};