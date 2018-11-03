import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { history } from './../../../store'
import { logout } from '../../../actions/auth/logout'
import { setActivePage } from '../../../actions/profile'

import ProfileInfo from './ProfileInfo'
import ProfilePosts from './ProfilePosts'

import './index.css'

class Profile extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isLoaded: false,
			profileInfo: null,
			profilePosts: []
		};
		
	}

	defUserId() {
		const userIdURL = this.props.match.params.userId;
		let userId = null;

		if(userIdURL){
			userId = userIdURL;
		} else {
			userId = localStorage.userId;
			history.replace('/profile/' + userId);
		}

		return userId;
	}

	componentDidMount() {
		fetch(`/profile/getInfo?id=${this.defUserId()}`, {
			credentials: 'include'
		})
		.then(res => res.json())
		.then(data => {
			if(data.error === 401) {
				this.props.logout();
				return false;
			}
			this.setState({
				isLoaded: true,
				profileInfo: data.profileInfo,
				profilePosts: data.profilePosts
			})
		})

		this.props.setActivePage();
	}

	render() {
		if(!this.state.isLoaded) return <img src="/img/preload.gif" className="preload_page" alt=""/>;

		const { 
			profileInfo,
			profilePosts,
		} = this.state;

		return (
			<div className="profile">
				<ProfileInfo
					profileInfo={profileInfo}
				/>
				<ProfilePosts 
					profilePosts={profilePosts}
				/>
			</div>
		);
	}
}

Profile.propTypes = {
	page: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired,
	setActivePage: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	page: state.page,
})

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logout()),
	setActivePage: () => dispatch(setActivePage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
