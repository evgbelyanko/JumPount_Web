import {
	SET_PAGE_CONF,
} from './types'
//import { userLogout } from './auth/logout'
import { setTypeDevice } from './setTypeDevice'

export const setPageConf = () => ({
	type: SET_PAGE_CONF,
	payload: {
		name: 'camera',
		device: setTypeDevice()
	}
})