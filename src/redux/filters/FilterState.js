import * as ActionTypes from './ActionTypes';

const initialState =  {
    minPrice: 0,
    maxPrice: 50000,
    typeOptions: [],
    searchText: ''
};

export const FilterState = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.SET_MIN_MAX:
            return { ...state, minPrice:action.payload.min, maxPrice: action.payload.max };

        case ActionTypes.SET_TYPES:
            return { ...state, typeOptions:action.payload };

        case ActionTypes.UPDATE_TYPE:
            let newState= {...state};
            newState.typeOptions[action.payload.key] = action.payload.value;
            return newState;
        
        case ActionTypes.SET_SEARCH_TEXT:
            return {...state, searchText: action.payload};

        default:
            return state;
    }
};