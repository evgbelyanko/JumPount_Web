import { 
	GET_FEED_MORE_POSTS,
	GET_SEARCH_MORE_POSTS,
	GET_PAGE_DATA_REQUEST,
	GET_PAGE_DATA_SUCCESS,
	GET_PAGE_DATA_FAILURE,
	GET_PROFILE_MORE_POSTS,
	GET_SEARCH_USERS_SUCCESS,
	GET_SEARCH_USERS_FAILURE,
	SEND_UPDATE_AVATAR_SUCCESS,
} from '../actions/types';

const initialState = {}

export default function(state = initialState, action ) {

	switch(action.type) {
		case GET_PAGE_DATA_REQUEST:
			return {
				loading: true
			}
		case GET_PAGE_DATA_SUCCESS:
			return {
				isLoaded: true,
				...action.payload
			}
		case GET_PAGE_DATA_FAILURE:
			return {
				isFailed: true
			}
		case SEND_UPDATE_AVATAR_SUCCESS:
			const newSetting = {
				...state.setting,
				...action.payload
			}
			return {
				...state,
				setting: newSetting
			}
		case GET_SEARCH_USERS_SUCCESS:
			return {
				...state,
				...action.payload
			}
		case GET_SEARCH_USERS_FAILURE:
			state.searchUsers = null;
			return state;
		case GET_FEED_MORE_POSTS:
			return {
				...state,
				feedPosts: state.feedPosts.concat(action.payload)
			}
		case GET_SEARCH_MORE_POSTS:
			return {
				...state,
				searchPosts: state.searchPosts.concat(action.payload)
			}
		case GET_PROFILE_MORE_POSTS:
			return {
				...state,
				profilePosts: state.profilePosts.concat(action.payload)
			}
		default: 
			return state;
	}
}