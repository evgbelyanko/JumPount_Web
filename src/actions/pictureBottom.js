import config from '../config'
import { handleError } from './handleError'

export const changeTextBox = (objPostBottom) => dispatch => {
	fetch(`${config.serverUrl}/photoview/changeTextBox`, {
		method: 'post', 
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}, 
		body: JSON.stringify(objPostBottom)
	})
	.then(res => res.json())
	.then(data => {
		if(data.error) {
			dispatch(handleError(data.error))
			return false;
		}
	})
}