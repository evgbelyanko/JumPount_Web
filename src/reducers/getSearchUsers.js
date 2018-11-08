import { 
	GET_SEARCH_USERS_REQUEST,
	GET_SEARCH_USERS_SUCCESS,
	GET_SEARCH_USERS_FAILURE
} from '../actions/types';

const initialState = {}

export default function(state = initialState, action ) {

	switch(action.type) {
		case GET_SEARCH_USERS_REQUEST:
			return {
				loading: true
			}
		case GET_SEARCH_USERS_SUCCESS:
			return {
				isLoaded: true,
				list: action.payload.searchUsers
			}
		case GET_SEARCH_USERS_FAILURE:
			return {
				isFailed: true
			}
		default: 
			return state;
	}
}