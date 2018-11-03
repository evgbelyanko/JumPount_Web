import { SET_ACTIVE_PAGE } from './types'
import { setTypeDevice } from './setTypeDevice';
//import { logout } from './auth/logout';

export const setActivePage = () => {
	return {
		type: SET_ACTIVE_PAGE,
		payload: {
			name: 'feed',
			device: setTypeDevice()
		}
	}
}