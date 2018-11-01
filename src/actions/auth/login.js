import Config from '../../config'
import { SET_CURRENT_USER } from '../types'



export const authRequest = () => dispatch => {
	return {
		type: 'LOGIN_REQUEST'
	}
}

export const authFailure = () => dispatch => {
	return {
		type: 'LOGIN_FAILURE'
	}
}

export const authSuccess = (user) => dispatch => {
	localStorage.setItem('userId', user.id);
	localStorage.setItem('token', user.token);

	window.location.replace('/feed');

	return {
		type: 'LOGIN_SUCCESS'
	}
}

export const setCurrentUser = (decoded) => dispatch => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	}
}

export const authVkontakte = (sessionData) => dispatch => {
	const userId = sessionData.session.user.id;
	
	dispatch(authRequest());

	fetch(Config.API + `/auth/vkontakte`, {
		method: 'post', 
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}, 
		body: JSON.stringify({userid: userId})
	}).then(response => response.json())
	.then(result => {
		const { user } = result;
		dispatch(authSuccess(user));
	})
	.catch(err => {
		dispatch(authFailure());
	});
}