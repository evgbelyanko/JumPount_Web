import { 
	GET_PAGE_DATA_REQUEST,
	GET_PAGE_DATA_SUCCESS,
	GET_PAGE_DATA_FAILURE,
	SEND_UPDATE_AVATAR_SUCCESS
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
		default: 
			return state;
	}
}