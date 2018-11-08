import {
	OPEN_MENU,
	CLOSE_MENU,
	SET_PAGE_CONF,
	FOLLOWS_CLOSE,
	FOLLOWS_REQUEST,
	FOLLOWS_SUCCESS,
	FOLLOWS_FAILURE,
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


export const followsSuccess = (data) => ({ 
	type: FOLLOWS_SUCCESS,
	payload: data
})
export const followsClose = () => ({ type: FOLLOWS_CLOSE })
export const followsRequest = () => ({ type: FOLLOWS_REQUEST })
export const followsFailure = () => ({ type: FOLLOWS_FAILURE })


export const followsGetPageData = (page, userId) => dispatch => {
	dispatch(followsRequest())
	fetch(`/follows/users?page=${page}&userid=${userId}`, {
		credentials: 'include'
	})
	.then(res => res.json())
	.then(data => {
		if(data.error === 401) {
			dispatch(followsFailure())
			dispatch(userLogout())
			return false;
		}
		data.page = page;
		data.userId = userId;
		dispatch(followsSuccess(data))
		dispatch(setPageConf())
	})
}