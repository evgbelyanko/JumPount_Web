import { userLogout } from './auth/logout'

export const handleError = (error) => dispatch => {
	switch(error) {
		case 400:
			window.location.assign('/');
			break;
		case 401:
			dispatch(userLogout());
			break;
		default:
			return false;
	}
}