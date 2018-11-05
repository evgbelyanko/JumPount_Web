import { SET_ACTIVE_PAGE } from '../actions/types';

const initialState = { 
	name: null,
	device: null
};

export default function(state = initialState, action ) {
	switch(action.type) {
		case SET_ACTIVE_PAGE:
			return action.payload

		default: 
			return state;
	}
}