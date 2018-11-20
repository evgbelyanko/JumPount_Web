export const authSuccess = (user) => dispatch => {
	console.log(user)
	localStorage.setItem('userId', user.id);
	//localStorage.setItem('token', user.token);

	window.location.assign('/feed');

	return {
		type: 'LOGIN_SUCCESS'
	}
}

export const authVkontakte = () => dispatch => {
	const VKAPI = {
		client_id: 6704784, 
		redirect_uri: 'http://77.106.125.227:8000/auth/vkontakte',
		response_type: 'code',
		display: 'popup'
	}

	function params(params){
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

	document.location.assign('http://oauth.vk.com/authorize?' + params(VKAPI));
/*	fetch(`/auth/vkontakte`, {
		mode: 'no-cors',
		credentials: 'include',
	})
	.then(res => res.json())
	.then(data => {
		console.log(data)
		dispatch(authSuccess(data.user));
	})*/
}