import { userLogout } from './auth/logout'

export const changeTextBox = (objPostBottom) => dispatch => {
	fetch(`/photoview/changeTextBox`, {
		method: 'post', 
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}, 
		body: JSON.stringify(objPostBottom)
	})
	.then(res => res.json())
	.then(data => {
		if(data.error === 401) {
			dispatch(userLogout())
			return false;
		}
	})
}