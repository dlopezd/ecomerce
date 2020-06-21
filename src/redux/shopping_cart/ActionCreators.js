import * as ActionTypes from './ActionTypes';

export const addItemCart = data => (dispatch) => {
	dispatch(addItemCartState(data));
}

export const updateItemCart = (id, data) => (dispatch) => {
	dispatch(updateItemCartState(id, data));
}

export const removeItemCart = id => dispatch => {
	dispatch(removeItemCartState(id));
} 



const addItemCartState = data => ({
	type: ActionTypes.CART_ADD_ITEM,
	payload: data
});

const updateItemCartState = (id, data) => ({
	type: ActionTypes.CART_UPDATE_ITEM,
	payload: {id:id, item:data}
});

const removeItemCartState = (id) => ({
	type: ActionTypes.CART_REMOVE_ITEM,
	payload: id
});