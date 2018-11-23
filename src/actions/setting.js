import {
	SET_PAGE_CONF,
	GET_PAGE_DATA_REQUEST,
	GET_PAGE_DATA_SUCCESS,
	GET_PAGE_DATA_FAILURE,
	SEND_UPDATE_AVATAR_SUCCESS,
} from './types'
import config from '../config'
import { handleError } from './handleError'
import { setTypeDevice } from './setTypeDevice'


export const setPageConf = () => {
	return {
		type: SET_PAGE_CONF,
		payload: {
			name: 'setting',
			device: setTypeDevice()
		}
	}
}

export const getPageDataSuccess = (data) => ({
	type: GET_PAGE_DATA_SUCCESS,
	payload: data
})
export const getPageDataRequest = () => ({ type: GET_PAGE_DATA_REQUEST })
export const getPageDataFailure = () => ({ type: GET_PAGE_DATA_FAILURE })
export const getPageData = () => dispatch => {
	dispatch(getPageDataRequest())
	fetch(`${config.serverUrl}/setting/getInfo`, {
		credentials: 'include'
	})
	.then(res => res.json())
	.then(data => {
		if(data.error) {
			dispatch(getPageDataFailure())
			dispatch(handleError(data.error))
			return false;
		}
		dispatch(getPageDataSuccess(data))
		dispatch(setPageConf())
	})
}

export const sendUpdateAvatarSuccess = (data) => ({
	type: SEND_UPDATE_AVATAR_SUCCESS,
	payload: data
})

export const sendUpdateAvatar = (file) => dispatch => {
	const formData = new FormData();
	formData.append('file', file);

	fetch(`${config.serverUrl}/setting/updateAvatar`, {
		method: 'post', 
		credentials: 'include',
		body: formData
	})
	.then(res => res.json())
	.then(data => {
		if(data.error) {
			dispatch(handleError(data.error))
			return false;
		}
		dispatch(sendUpdateAvatarSuccess(data))
	})
}

export const sendDeleteAvatar = () => dispatch => {
	fetch(`${config.serverUrl}/setting/deleteAvatar`, {
		method: 'post', 
		credentials: 'include',
	})
	.then(res => res.json())
	.then(data => {
		if(data.error) {
			dispatch(handleError(data.error))
			return false;
		}
		dispatch(sendUpdateAvatarSuccess(data))
	})
}

export const sendRowsSetting = (data) => dispatch => {
	fetch(`${config.serverUrl}/setting/updateProfile`, {
		method: 'post', 
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}, 
		body: JSON.stringify(data)
	})
	.then(res => res.json())
	.then(data => {
		if(data.error) {
			dispatch(handleError(data.error))
			return false;
		}
	})
}