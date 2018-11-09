import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { history } from './../../../store'

import { getPageData } from '../../../actions/profile'

import Follows from '../follows'
import PhotoView from '../photoview'
import ProfileInfo from './ProfileInfo'
import ProfilePosts from './ProfilePosts'

import Menu from '../../elements/menu'
import Preload from '../../elements/preload'

import './index.css'

class Profile extends React.Component {

	defUserId() {
		const userIdURL = this.props.match.params.userId;
		const userId = userIdURL ? userIdURL : localStorage.userId;

		return userId;
	}

	componentDidMount() {
		const userId = this.defUserId();
		
		this.props.getPageData(userId);
		history.replace(`/user/${userId}`);
	}

	render() {
		if(!this.props.pageData.profile) return <Preload />;

		const {
			menu,
			follows,
			photoView
		} = this.props;

		return (
			<div className="profile">
				<ProfileInfo 
				history={this.props.history} />
				<ProfilePosts
				history={this.props.history} />

				{menu.isLoaded ? 
					<Menu
					followUser={true}
					goToSetting={true}
					goToUserLogout={true}
					/> : null}
				{follows.isLoaded ? <Follows /> : null }
				{photoView.isLoaded ? <PhotoView /> : null}
			</div>
		);
	}
}

Profile.propTypes = {
	menu: PropTypes.object.isRequired,
	follows: PropTypes.object.isRequired,
	pageData: PropTypes.object.isRequired,
	getPageData: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	menu: state.menu,
	follows: state.follows,
	pageData: state.pageData,
	photoView: state.photoView,
})

const mapDispatchToProps = (dispatch) => ({
	getPageData: (userId) => dispatch(getPageData(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
