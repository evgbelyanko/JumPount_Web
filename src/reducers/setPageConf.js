import { SET_PAGE_CONF } from '../actions/types';

const initialState = { 
	name: null,
	device: null
};

export default function(state = initialState, action ) {
	switch(action.type) {
		case SET_PAGE_CONF:
			return {...state, ...action.payload}

		default: 
			return state;
	}
}