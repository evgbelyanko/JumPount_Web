import { 
	FOLLOWS_OPEN,
	FOLLOWS_CLOSE,
	FOLLOWS_REQUEST,
	FOLLOWS_SUCCESS,
	FOLLOWS_FAILURE,
} from '../actions/types';

const initialState = {};

export default function(state = initialState, action ) {

	switch(action.type) {
		case FOLLOWS_OPEN:
			return { isOpen: true }
		case FOLLOWS_CLOSE:
			return { isClose: true }
		case FOLLOWS_REQUEST:
			return { loading: true }
		case FOLLOWS_SUCCESS:
			return {
				isLoaded: true,
				...action.payload
			}
		case FOLLOWS_FAILURE:
			return { isFailed: true }
		default: 
			return state;
	}
}