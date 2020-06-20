import * as ActionTypes from './ActionTypes';
import * as AmiiboClient from '../../restServices/amiiboApiClient'

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

const setMinMaxState = data => ({
	type: ActionTypes.SET_MIN_MAX,
	payload: data
});

const setTypesState = (data) => ({
	type: ActionTypes.SET_TYPES,
	payload: data
});

const updateTypeOption = (key, value) => ({
	type: ActionTypes.UPDATE_TYPE,
	payload: {key: key, value: value}
})