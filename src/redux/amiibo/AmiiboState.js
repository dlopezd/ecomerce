import * as ActionTypes from './ActionTypes';

const initialState =  {
    isLoading: false,
    errMess: null,
    amiibos: []
};

export const AmiiboState = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.AMIIBO_FETCHED:
            return { ...state, isLoading: false, errMess: null, amiibos:action.payload };

        case ActionTypes.AMIIBO_LOADING:
            return { ...state, isLoading: true, errMess: null, amiibos: [] };

        case ActionTypes.AMIIBO_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        default:
            return state;
    }
};