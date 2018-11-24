import { userLogout } from './auth/logout'

export const handleError = (error) => dispatch => {
	switch(error) {
		case 400:
			//window.location.assign('/');
			break;
		case 401:
			dispatch(userLogout());
			break;
		case 404:
			window.location.assign('/notfound');
			break;
		default:
			return false;
	}
}