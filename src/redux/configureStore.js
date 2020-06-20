import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { AmiiboState } from './amiibo/AmiiboState';
import { TypeState } from './type/TypeState';
import logger from 'redux-logger';

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			amiiboState: AmiiboState,
			typeState: TypeState
		}),
		applyMiddleware(thunk, logger)
	);

	return store;
}