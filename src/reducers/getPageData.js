import { 
	GET_PAGE_DATA_REQUEST,
	GET_PAGE_DATA_SUCCESS,
	GET_PAGE_DATA_FAILURE,
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
		default: 
			return state;
	}
}