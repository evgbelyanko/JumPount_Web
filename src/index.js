import React from 'react'
import store from './store'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'

import App from './app'

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
)

registerServiceWorker();