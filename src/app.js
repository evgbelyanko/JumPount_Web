import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

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

import './app.css'

class App extends React.Component {

	render() {
		const Authorized = ({ component: Component, ...rest }) => (  
			<Route {...rest} render={props => (
				localStorage.token ? (
					<div>
						<Header />
						<div className="content">
							<Component {...props} />
						</div>
					</div>
				) : (
					<Redirect to={{
						pathname: '/auth',
						state: { from: props.location }
					}} />
				)
			)}/>
		)

		return (
				<Router>
					<div>
						<Route exact path="/auth" component={Auth} />
						{/*<Route path='*' component={NotFound} />*/}
						<Authorized path="/map" component={Gmap} />
						<Authorized path="/feed" component={Feed} />
						<Authorized path="/camera" component={Camera} />
						<Authorized path="/search" component={Search} />
						<Authorized path="/photoview/:postId" component={PhotoView} />
						<Authorized path="/setting" component={Setting} />
						<Authorized path="/user/:userId?" component={Profile} />
						<Authorized path="/following/:userId" component={Follows} />
						<Authorized path="/followers/:userId" component={Follows} />
						<Authorized exact path="/" component={localStorage.token ? Feed : Auth} />
					</div>
				</Router>
		)
	}
}

export default App;