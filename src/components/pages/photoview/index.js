import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { history } from './../../../store'
import ImageLoader from 'react-imageloader'

import Menu from '../../elements/menu'
import PostComments from './PostComments'
import Window from '../../elements/window'
import PostInfo from '../../elements/postInfo'
import UserBlock from '../../elements/userBlock'
import PictureBottom from '../../elements/pictureBottom'

import {
	openMenu,
	closeMenu,
	photoViewClose,
	photoViewGetPageData,
} from '../../../actions/photoView'

import './index.css'

class PhotoView extends React.Component {

	constructor(props) {
		super(props)

		const {
			postId,
			isLoaded
		} = props.photoView;

		this.state = {
			autonomous: isLoaded ? false : true,
			postId: isLoaded ? postId : props.match.params.postId,
		}
	}

	componentDidMount() {
		const {
			postId,
			autonomous
		} = this.state;

		const {
			getPageData,
			photoViewClose,
		} = this.props;

		window.onpopstate = () => { photoViewClose(); }
		if(!autonomous) history.push(`/photoview/${postId}`);
		if(autonomous) getPageData(postId);
	}

	render() {
		if(!this.props.photoView.isLoaded) return false;

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
		} = this.props.photoView.postInfo;
		
		const {
			menu,
			pageConf,
			openMenu,
			closeMenu,
		} = this.props;

		return (
			<div className="photoView">
				<Window 
				width={900} 
				onClose={() => this.windowClose()}
				zIndex={800}
				enable={pageConf.device === 'desktop' ? true : false}>
					<div className="photoView">
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
							ellipsisOpen={() => openMenu()}
							ellipsisClose={() => closeMenu()} />
						</div>
						<div className="photoView_postInfo">
							<PostInfo
							photoLikes={photo_likes}
							photoComments={photo_comments}
							likeId={like_id} />
						</div>
						<PostComments 
						postComments={this.props.photoView.postComments} />
						<div className="photoView_input">
							<textarea placeholder="Напишите сообщение..." />
							<button className="fa fa-send" />
						</div>
					</div>
				</Window>
				{menu ? <Menu onClose={() => closeMenu()} /> : null}
			</div>
		)
	}

	windowClose() {
		const { photoViewClose } = this.props;
		const { autonomous } = this.state;

		if(autonomous){
			this.props.history.push(`/map`);
			photoViewClose();
		} else {
			history.goBack();
		}
	}
}

PhotoView.propTypes = {
	menu: PropTypes.bool.isRequired,
	openMenu: PropTypes.func.isRequired,
	closeMenu: PropTypes.func.isRequired,
	pageConf: PropTypes.object.isRequired,
	getPageData: PropTypes.func.isRequired,
	photoViewClose: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	menu: state.menu,
	pageConf: state.pageConf,
	photoView: state.photoView,
})

const mapDispatchToProps = (dispatch) => ({
	openMenu: () => dispatch(openMenu()),
	closeMenu: () => dispatch(closeMenu()),
	photoViewClose: () => dispatch(photoViewClose()),
	getPageData: (postId) => dispatch(photoViewGetPageData(postId)),

})

export default connect(mapStateToProps, mapDispatchToProps)(PhotoView);