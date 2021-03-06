import config from '../../config'

export const userLogout = () => dispatch => {
	fetch(`${config.serverUrl}/auth/logout`, {
		method: 'post',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({token: localStorage.token})
	});

	localStorage.removeItem('token');
	localStorage.removeItem('userId');

	window.location.replace('/auth');
}