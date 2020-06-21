import * as ActionTypes from './ActionTypes';

const initialState =  {
    isLoading: false,
    errMess: null,
    amiibo: null
};

export const AmiiboDetailState = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.AMIIBOD_FETCHED:
            return { ...state, isLoading: false, errMess: null, amiibo:action.payload };

        case ActionTypes.AMIIBOD_LOADING:
            return { ...state, isLoading: true, errMess: null, amiibo: null };

        case ActionTypes.AMIIBOD_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        default:
            return state;
    }
};