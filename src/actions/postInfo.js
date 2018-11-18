import {
	SEND_LIKE_SUCCESS,
} from './types'
import { userLogout } from './auth/logout'

export const menuActionsLikeSuccess = (data) => ({ 
	type: SEND_LIKE_SUCCESS,
	payload: data
})

export const menuActionsLike = (postId) => dispatch => {
	fetch(`/menu/sendLike`, {
		method: 'post', 
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}, 
		body: JSON.stringify({postId: postId})
	})
	.then(res => res.json())
	.then(data => {
		if(data.error === 401) {
			dispatch(userLogout())
			return false;
		}
		dispatch(menuActionsLikeSuccess(data))
	})
}