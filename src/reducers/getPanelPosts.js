import { 
	GET_PANEL_POSTS_REQUEST,
	GET_PANEL_POSTS_SUCCESS,
	GET_PANEL_POSTS_FAILURE
} from '../actions/types';

const initialState = {}

export default function(state = initialState, action ) {

	switch(action.type) {
		case GET_PANEL_POSTS_REQUEST:
			return {
				loading: true
			}
		case GET_PANEL_POSTS_SUCCESS:
			return {
				isLoaded: true,
				...action.payload
			}
		case GET_PANEL_POSTS_FAILURE:
			return {
				isFailed: true
			}
		default: 
			return state;
	}
}