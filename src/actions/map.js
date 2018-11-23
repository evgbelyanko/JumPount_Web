import {
	SET_PAGE_CONF,
	PHOTOVIEW_OPEN,
	GET_PAGE_DATA_REQUEST,
	GET_PAGE_DATA_SUCCESS,
	GET_PAGE_DATA_FAILURE,
	GET_PANEL_POSTS_REQUEST,
	GET_PANEL_POSTS_SUCCESS,
	GET_PANEL_POSTS_FAILURE,
} from './types'
import config from '../config'
import { handleError } from './handleError'
import { setTypeDevice } from './setTypeDevice';
import { photoViewGetPageData } from './photoView';

export const setPageConf = () => {
	return {
		type: SET_PAGE_CONF,
		payload: {
			name: 'map',
			device: setTypeDevice()
		}
	}
}


export const photoViewOpen = (postId) => dispatch => {
	dispatch(photoViewGetPageData(postId))
	
	return { type: PHOTOVIEW_OPEN }
}


export const getPageDataSuccess = (data) => ({
	type: GET_PAGE_DATA_SUCCESS,
	payload: data
})
export const getPageDataRequest = () => ({ type: GET_PAGE_DATA_REQUEST })
export const getPageDataFailure = () => ({ type: GET_PAGE_DATA_FAILURE })

export const getPageData = () => dispatch => {
	dispatch(getPageDataRequest())
	fetch(`${config.serverUrl}/map/clusters`, {
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


export const getPanelPostsSuccess = (data) => ({
	type: GET_PANEL_POSTS_SUCCESS,
	payload: data
})
export const getPanelPostsRequest = () => ({ type: GET_PANEL_POSTS_REQUEST })
export const getPanelPostsFailure = () => ({ type: GET_PANEL_POSTS_FAILURE })
export const getPanelPosts = (markersIds) => dispatch => {
	dispatch(getPanelPostsRequest())
	fetch(`${config.serverUrl}/map/posts`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify({markerIds: markersIds})
	})
	.then(res => res.json())
	.then(data => {
		if(data.error) {
			dispatch(getPanelPostsFailure())
			dispatch(handleError(data.error))
			return false;
		}
		dispatch(getPanelPostsSuccess(data))
	})
}