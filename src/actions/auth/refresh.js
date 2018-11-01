import { logout } from './logout';


export const refreshRequest = () => dispatch => {
	return {
		type: 'REFRESH_REQUEST'
	}
}

export const refershFailure = () => {
	logout();
	return {
		type: 'REFRESH_FAILURE'
	}
}

export const refreshSuccess = () => dispatch => {
	return {
		type: 'REFRESH_SUCCESS'
	}
}

export const refresh = () => dispatch => { 
    refreshRequest()

    fetch(`/auth/refresh`, {
	  method: 'post',
	  credentials: 'include',
	  headers: {  
	    'Content-Type': 'application/json'
	  },
	  body: JSON.stringify({ token: localStorage.getItem('token') })
	}).then(response => response.json())
	.then(result => {
		console.log('refresh')
		refreshSuccess()
	})
	.catch(err => {
		console.log(err)
		refershFailure()
	});

}