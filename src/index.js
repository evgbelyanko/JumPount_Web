import React from 'react'
import store from './store'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'

import App from './app'

if(localStorage.token) { 
	console.info('AUTHORIZED')
	//setInterval(refresh(), 10*60*1000); 
} else {
	console.info('NOT AUTHORIZED')
}
console.log(localStorage)

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
)

registerServiceWorker();