import { SET_PAGE_CONF } from '../types'
import { setTypeDevice } from '../setTypeDevice';
//import { logout } from './auth/logout';

export const setPageConf = () => {
	return {
		type: SET_PAGE_CONF,
		payload: {
			name: 'auth',
			device: setTypeDevice()
		}
	}
}