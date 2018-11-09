import { 
	FOLLOWS_OPEN,
	FOLLOWS_CLOSE,
	FOLLOWS_REQUEST,
	FOLLOWS_SUCCESS,
	FOLLOWS_FAILURE,
	GET_PAGE_DATA_REQUEST,
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
		case GET_PAGE_DATA_REQUEST:
			return { isClose: true };
		default: 
			return state;
	}
}