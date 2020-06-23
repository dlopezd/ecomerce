import * as ActionTypes from './ActionTypes';
import * as AmiiboClient from '../../restServices/amiiboApiClient'
import { setTypeFilters } from '../filters/ActionCreators'

export const fetchType = () => (dispatch) => {

	dispatch(typeLoading());

	return AmiiboClient.getTypes()
		.then(response => {
			dispatch(setTypeFilters(response.data.amiibo));
			dispatch(typeFetch(response.data.amiibo))
		})
		.catch(error => dispatch(typeFailed(error.message)));
}

const typeLoading = _ => ({
	type: ActionTypes.TYPE_LOADING
});

const typeFailed = (errmess) => ({
	type: ActionTypes.TYPE_FAILED,
	payload: errmess
});

const typeFetch = (types) => ({
	type: ActionTypes.TYPE_FETCHED,
	payload: types
});