import * as ActionTypes from './ActionTypes';
import * as AmiiboClient from '../../restServices/amiiboApiClient'

export const fetchAmiibos = () => (dispatch) => {

	dispatch(amiibosLoading());

	return AmiiboClient.getAmiibos()
		.then(response => {
			const amiibos = response.data.amiibo.map(a => {
				return ({
					...a,
					price: (Math.floor(Math.random() * (4501 - 1499)) + 1499) * 10
				})
			});
			dispatch(amiibosFetch(amiibos))
		})
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