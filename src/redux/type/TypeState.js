import * as ActionTypes from './ActionTypes';

const initialState =  {
    isLoading: true,
    errMess: null,
    types: []
};

export const TypeState = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.TYPE_FETCHED:
            return { ...state, isLoading: false, errMess: null, types:action.payload };

        case ActionTypes.TYPE_LOADING:
            return { ...state, isLoading: true, errMess: null, types: [] };

        case ActionTypes.TYPE_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        default:
            return state;
    }
};