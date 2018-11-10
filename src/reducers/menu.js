import { 
	MENU_OPEN,
	MENU_CLOSE,
	MENU_REQUEST,
	MENU_SUCCESS,
	MENU_FAILURE,
	GET_PAGE_DATA_REQUEST,
	MENU_ACTIONS_FOLLOWING_SUCCESS
} from '../actions/types';

const initialState = {};

export default function(state = initialState, action ) {

	switch(action.type) {
		case MENU_OPEN:
			return { isOpen: true }
		case MENU_CLOSE:
			return { isClose: true }
		case MENU_REQUEST:
			return { loading: true }
		case MENU_SUCCESS:
			return {
				isLoaded: true,
				...action.payload
			}
		case MENU_FAILURE:
			return { isFailed: true }
		case MENU_ACTIONS_FOLLOWING_SUCCESS:
			return {
				...state,
				...action.payload
			}
		case GET_PAGE_DATA_REQUEST:
			return { isClose: true }
		default: 
			return state;
	}
}