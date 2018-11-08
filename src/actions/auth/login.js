export const authSuccess = (user) => dispatch => {
	localStorage.setItem('userId', user.id);
	localStorage.setItem('token', user.token);

	window.location.replace('/feed');

	return {
		type: 'LOGIN_SUCCESS'
	}
}

export const authVkontakte = (sessionData) => dispatch => {
	const userId = sessionData.session.user.id;

	fetch(`/auth/vkontakte`, {
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
}