import * as ActionTypes from './ActionTypes';

export const setMinMaxFilters = (data) => (dispatch) => {
	dispatch(setMinMaxState(data));
}

export const setTypeFilters = types => (dispatch) => {
	const typesOptions = [];
	types.forEach(t => {
		typesOptions[t.name] = false;
	});
	dispatch(setTypesState(typesOptions))
}

export const updateTypeFilters = (key, value) => (dispatch) => {
	dispatch(updateTypeOption(key, value));
}

export const setSearchText = searchText => dispatch => {
	dispatch(setSearchTextState(searchText));
} 


const setMinMaxState = data => ({
	type: ActionTypes.SET_MIN_MAX,
	payload: data
});

const setTypesState = (data) => ({
	type: ActionTypes.SET_TYPES,
	payload: data
});

const setSearchTextState = (data) => ({
	type: ActionTypes.SET_SEARCH_TEXT,
	payload: data
});

const updateTypeOption = (key, value) => ({
	type: ActionTypes.UPDATE_TYPE,
	payload: {key: key, value: value}
})