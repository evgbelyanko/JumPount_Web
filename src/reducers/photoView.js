import { 
	PHOTOVIEW_OPEN,
	PHOTOVIEW_CLOSE,
	PHOTOVIEW_REQUEST,
	PHOTOVIEW_SUCCESS,
	PHOTOVIEW_FAILURE,
	GET_PAGE_DATA_REQUEST
} from '../actions/types';

const initialState = {};

export default function(state = initialState, action ) {

	switch(action.type) {
		case PHOTOVIEW_OPEN:
			return { isOpen: true }
		case PHOTOVIEW_CLOSE:
			return { isClose: true }
		case PHOTOVIEW_REQUEST:
			return { loading: true }
		case PHOTOVIEW_SUCCESS:
			return {
				isLoaded: true,
				...action.payload
			}
		case PHOTOVIEW_FAILURE:
			return { isFailed: true }
		case GET_PAGE_DATA_REQUEST:
			return { isClose: true }
		default: 
			return state;
	}
}