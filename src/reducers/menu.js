import { 
	OPEN_MENU,
	CLOSE_MENU,
	//CREATE_MENU
} from '../actions/types';

const initialState = false;

export default function(state = initialState, action ) {

	switch(action.type) {
		case OPEN_MENU:
			return true;
		case CLOSE_MENU:
			return false;
		default: 
			return state;
	}
}