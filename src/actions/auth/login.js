import config from '../../config'

export const authSuccess = (user) => dispatch => {
	console.log(user)
	localStorage.setItem('userId', user.id);
	//localStorage.setItem('token', user.token);

	window.location.assign('/feed');

	return {
		type: 'LOGIN_SUCCESS'
	}
}

const params = (params) => {
	let str;
	for (let key in params) {
		if(key !== 'client_id'){
			str += '&' + key + '=' + params[key];
		} else {
			str = key + '=' + params[key];
		}
	}
	return str;
}

export const authVkontakte = () => dispatch => {
	const VKAPI = {
		client_id: '6704784', 
		redirect_uri: `${config.serverUrl}/auth/vkontakte`,
		response_type: 'code',
		display: 'popup'
	}

	document.location.assign('http://oauth.vk.com/authorize?' + params(VKAPI));
}

export const authFacebook = () => dispatch => {
	const FacebookAPI = {
		client_id: '562106614218636', 
		redirect_uri: `${config.serverUrl}/auth/facebook`,
		response_type: 'code'
	}

	document.location.assign('https://www.facebook.com/dialog/oauth?' + params(FacebookAPI));
}

export const authGoogle = () => dispatch => {
	const GoogleAPI = {
		client_id: '37283406293-hv292ahaibvul14a8qfljk5bj6v6pad4.apps.googleusercontent.com', 
		redirect_uri: `https://api.jumpoint.art/auth/google`,
		response_type: 'code',
		scope: 'https://www.googleapis.com/auth/userinfo.profile'
	}

	document.location.assign('https://accounts.google.com/o/oauth2/auth?' + params(GoogleAPI));
}