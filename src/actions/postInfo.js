import {
	SEND_LIKE_SUCCESS,
} from './types'
import config from '../config'
import { handleError } from './handleError'

export const menuActionsLikeSuccess = (data) => ({ 
	type: SEND_LIKE_SUCCESS,
	payload: data
})

export const menuActionsLike = (postId) => dispatch => {
	fetch(`${config.serverUrl}/menu/sendLike`, {
		method: 'post', 
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}, 
		body: JSON.stringify({postId: postId})
	})
	.then(res => res.json())
	.then(data => {
		if(data.error) {
			dispatch(handleError(data.error))
			return false;
		}
		dispatch(menuActionsLikeSuccess(data))
	})
}