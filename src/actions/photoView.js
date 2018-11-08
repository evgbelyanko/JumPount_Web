import {
	OPEN_MENU,
	CLOSE_MENU,
	SET_PAGE_CONF,
	PHOTOVIEW_CLOSE,
	PHOTOVIEW_REQUEST,
	PHOTOVIEW_SUCCESS,
	PHOTOVIEW_FAILURE,
} from './types'
import { userLogout } from './auth/logout';
import { setTypeDevice } from './setTypeDevice';

export const setPageConf = () => {
	return {
		type: SET_PAGE_CONF,
		payload: {
			device: setTypeDevice()
		}
	}
}

export const openMenu = () => ({ type: OPEN_MENU })
export const closeMenu = () => ({ type: CLOSE_MENU })


export const photoViewSuccess = (data) => ({ 
	type: PHOTOVIEW_SUCCESS,
	payload: data
})
export const photoViewClose = () => ({ type: PHOTOVIEW_CLOSE })
export const photoViewRequest = () => ({ type: PHOTOVIEW_REQUEST })
export const photoViewFailure = () => ({ type: PHOTOVIEW_FAILURE })


export const photoViewGetPageData = (postId) => dispatch => {
	dispatch(photoViewRequest())
	fetch(`/photoview/post?id=${postId}`, {
		credentials: 'include'
	})
	.then(res => res.json())
	.then(data => {
		if(data.error === 401) {
			dispatch(photoViewFailure())
			dispatch(userLogout())
			return false;
		}
		data.postId = postId;
		dispatch(photoViewSuccess(data))
		dispatch(setPageConf())
	})
}