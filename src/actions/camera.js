import { SET_ACTIVE_PAGE } from './types'
//import { logout } from './auth/logout';

export const setActivePage = () => {
	return {
		type: SET_ACTIVE_PAGE,
		payload: 'camera'
	}
}