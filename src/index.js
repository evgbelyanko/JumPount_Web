import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import store from './store'
import registerServiceWorker from './registerServiceWorker'
//import { refresh } from './actions/auth/refresh.js'

import Gmap from './components/pages/map'
import Auth from './components/pages/auth'
import Feed from './components/pages/feed'
import Search from './components/pages/search'
import Camera from './components/pages/camera'
import Profile from './components/pages/profile'
import Setting from './components/pages/setting'
import Follows from './components/pages/follows'
import Header from './components/elements/header'
import PhotoView from './components/pages/photoview'

import './index.css'


if(localStorage.token) { 
	console.info('AUTHORIZED')
	//setInterval(refresh(), 10*60*1000); 
} else {
	console.info('NOT AUTHORIZED')
}
console.log(localStorage)

const Authorized = ({ component: Component, ...rest }) => (  
	<Route {...rest} render={props => (
		localStorage.token ? (
			<div>
				<Header />
				<div className="content">
					<Component {...props}/>
				</div>
			</div>
		) : (
			<Redirect to={{
				pathname: '/auth',
				state: { from: props.location }
			}}/>
		)
	)}/>
)

render(
	<Provider store={store}>
		<Router>
			<div>
				<Route exact path="/auth" component={Auth} />
				{/*<Route path='*' component={NotFound} />*/}
				<Authorized path="/map" component={Gmap} />
				<Authorized path="/feed" component={Feed} />
				<Authorized path="/camera" component={Camera} />
				<Authorized path="/search" component={Search} />
				<Authorized path="/photoview/:id" component={PhotoView} />
				<Authorized path="/user/setting" component={Setting} />
				<Authorized path="/user/:userId?" component={Profile} />
				<Authorized path="/following/:userId" component={Follows} />
				<Authorized path="/followers/:userId" component={Follows} />
				<Authorized exact path="/" component={localStorage.token ? Feed : Auth} />
			</div>
		</Router>
	</Provider>,
	document.querySelector('#root')
)

registerServiceWorker();