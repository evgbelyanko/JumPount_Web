import { 
	PHOTOVIEW_OPEN,
	PHOTOVIEW_CLOSE,
	PHOTOVIEW_REQUEST,
	PHOTOVIEW_SUCCESS,
	PHOTOVIEW_FAILURE,
	GET_MORE_COMMENTS,
	MENU_REMOVE_SUCCESS,
	GET_COMMENT_SUCCESS,
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
		case GET_COMMENT_SUCCESS: 
			state.postComments.unshift(action.payload)

			return {
				...state,
				counterComments: 1,
			}
		case GET_MORE_COMMENTS: 
			state.postComments = state.postComments.concat(action.payload)

			return {
				...state,
				counterComments: 0,
			}
		case MENU_REMOVE_SUCCESS:
			state.postComments.reverse().splice(action.payload.key, 1)
			state.postComments.reverse()
			return {
				...state,
				counterComments: -1,
			}
		case GET_PAGE_DATA_REQUEST:
			return { isClose: true }
		default: 
			return state;
	}
}