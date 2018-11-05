import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { history } from './../../../store'
import ImageLoader from 'react-imageloader'

import Menu from '../../elements/menu'
import PostComments from './PostComments'
import Window from '../../elements/window'
import PostInfo from '../../elements/postInfo'
import UserBlock from '../../elements/userBlock'
import PictureBottom from '../../elements/pictureBottom'

import { logout } from '../../../actions/auth/logout'
import { setActivePage } from '../../../actions/photoView'

import './index.css'

class PhotoView extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			isLoaded: false,
			postInfo: null,
			postComments: [],
			menu: null,
		}
	}

	componentDidMount() {
		const {
			page,
			onClose,
			postPhotoViewId
		} = this.props;
		
		if(postPhotoViewId) window.onpopstate = () => { onClose() }

		const photoId = postPhotoViewId ? postPhotoViewId : this.props.match.params.id;
		if(page.device === 'desktop') history.push(`/photoview/${photoId}`);

		fetch(`/photoview/post?id=${photoId}`, {
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
				postInfo: data.postInfo,
				postComments: data.postComments
			});
		})

		this.props.setActivePage();
	}

	render() {
		if(!this.state.isLoaded) return false;

		return this.props.page.device === 'desktop' ? this.desktopVersion() : this.mobileVersion();
	}

	content() {
		const {
			user_id,
			user_name,
			avatar_50,
			photo_600,
			photo_title,
			photo_desc,
			photo_timestamp,
			photo_comments,
			photo_likes,
			like_id
		} = this.state.postInfo;

		return (
			<div className="photoView">
				{this.state.redirect ? <Redirect push to={`/user/${user_id}`} /> : null}
				<div className="photoView_picture">
					<ImageLoader
					src={photo_600}
					preloader={() => (<img src="/img/preload.gif" alt=""/>)} />
					<PictureBottom
					title={photo_title}
					desc={photo_desc} />
				</div>
				<div className="photoView_autor">
					<UserBlock 
					userId={user_id}
					userName={user_name}
					userAvatar={avatar_50}
					userDesc={photo_timestamp}
					ellipsis="true"
					ellipsisOpen={() => this.openMenu()}
					ellipsisClose={() => this.closeMenu()} />
				</div>
				<div className="photoView_postInfo">
					<PostInfo
					photoLikes={photo_likes}
					photoComments={photo_comments}
					likeId={like_id} />
				</div>
				<PostComments 
				postComments={this.state.postComments} />
				<div className="photoView_input">
					<textarea placeholder="Напишите сообщение..." />
					<button className="fa fa-send" />
				</div>
			</div>
		)
	}

	desktopVersion() {
		return (
			<div>
				<Window 
				width={900} 
				onClose={() => this.closePhotoView()}
				zIndex={800}>
					{this.content()}
				</Window>
				{this.state.menu ? this.createMenu() : null}
			</div>
		)
	}

	mobileVersion() {
		return this.content()
	}

	closePhotoView() {
		const {
			onClose,
			postPhotoViewId
		} = this.props;

		if(postPhotoViewId){
			history.goBack();
			onClose();
		} else {
			this.setState({ redirect: true })
		}
	}

	createMenu() {
		return ( <Menu onClose={() => this.closeMenu()} /> );
	}
    openMenu() { this.setState({ menu: true }) }
    closeMenu() { this.setState({ menu: null }) }

}

PhotoView.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(PhotoView);
