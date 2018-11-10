import { 
	MENU_ACTIONS_FOLLOWING_SUCCESS
} from '../actions/types';

const initialState = {};

export default function(state = initialState, action ) {

	switch(action.type) {
		case MENU_ACTIONS_FOLLOWING_SUCCESS:
			return action.payload
		default: 
			return state;
	}
}