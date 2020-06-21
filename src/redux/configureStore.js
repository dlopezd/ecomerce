import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { AmiiboListState } from './amiibo_list/AmiiboListState';
import { AmiiboDetailState } from './amiibo_detail/AmiiboDetailState';
import { TypeState } from './type/TypeState';
import { FilterState } from './filters/FilterState';
import { ShoppingCartState } from './shopping_cart/ShoppingCartState';

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			amiiboListState: AmiiboListState,
			amiiboDetailState: AmiiboDetailState,
			typeState: TypeState,
			filterState: FilterState,
			shoppingCartState: ShoppingCartState
		}),
		applyMiddleware(thunk, logger)
	);

	return store;
}