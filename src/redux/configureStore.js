import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { AmiiboListState } from './amiibo_list/AmiiboListState';
import { AmiiboDetailState } from './amiibo_detail/AmiiboDetailState';
import { TypeState } from './type/TypeState';
import { FilterState } from './filters/FilterState';
import logger from 'redux-logger';

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			amiiboListState: AmiiboListState,
			amiiboDetailState: AmiiboDetailState,
			typeState: TypeState,
			filterState: FilterState
		}),
		applyMiddleware(thunk, logger)
	);

	return store;
}