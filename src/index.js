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

const AuthenticatedRoute = ({ component: Component, ...rest }) => (  
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
				<AuthenticatedRoute exact path="/" component={Feed} />
				<AuthenticatedRoute path="/map" component={Gmap} />
				<AuthenticatedRoute path="/feed" component={Feed} />
				<AuthenticatedRoute path="/camera" component={Camera} />
				<AuthenticatedRoute path="/search" component={Search} />
				<AuthenticatedRoute path="/setting" component={Setting} />
				<AuthenticatedRoute path="/photoview/:id" component={PhotoView} />
				<AuthenticatedRoute path="/profile/:userId?" component={Profile} />
			</div>
		</Router>
	</Provider>,
	document.querySelector('#root')
)

registerServiceWorker();