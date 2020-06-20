import * as ActionTypes from './ActionTypes';
import * as AmiiboClient from '../../restServices/amiiboApiClient'

export const fetchAmiibos = () => (dispatch) => {

	dispatch(amiibosLoading());

	return AmiiboClient.getAmiibos()
		.then(response => dispatch(amiibosFetch(response.data)))
		.catch(error => dispatch(amiibosFailed(error.message)));
}

const amiibosLoading = _ => ({
	type: ActionTypes.AMIIBO_LOADING
});

const amiibosFailed = (errmess) => ({
	type: ActionTypes.AMIIBO_FAILED,
	payload: errmess
});

const amiibosFetch = (amiibos) => ({
	type: ActionTypes.AMIIBO_FETCHED,
	payload: amiibos
});