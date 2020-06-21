import * as ActionTypes from './ActionTypes';
import * as AmiiboClient from '../../restServices/amiiboApiClient'
import { setTypeFilters } from '../filters/ActionCreators'

export const fetchType = () => (dispatch) => {

	dispatch(typeLoading());

	// return AmiiboClient.getTypes()
	// 	.then(response => {
	// 		dispatch(setTypeFilters(response.data.amiibo));
	// 		dispatch(typeFetch(response.data.amiibo))
	// 	})
	// 	.catch(error => dispatch(typeFailed(error.message)));
	dispatch(setTypeFilters(types));
	dispatch(typeFetch(types));
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


const types = [
	{
		"key": "0x00",
		"name": "Figure"
	},
	{
		"key": "0x01",
		"name": "Card"
	},
	{
		"key": "0x02",
		"name": "Yarn"
	}
];