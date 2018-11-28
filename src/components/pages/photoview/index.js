import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { history } from './../../../store'
import ImageLoader from 'react-imageloader'
import TextareaAutosize from 'react-textarea-autosize'

import Menu from '../../elements/menu'
import PostComments from './PostComments'
import Window from '../../elements/window'
import Preload from '../../elements/preload'
import PostInfo from '../../elements/postInfo'
import UserBlock from '../../elements/userBlock'
import MenuRemove from '../../elements/menu/menuRemove'
import PictureBottom from '../../elements/pictureBottom'

import {
	menuOpen,
	sendComment,
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
			inputHeight: 40,
			textareaValue: '',
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
			pageConf,
			getPageData,
			photoViewClose,
		} = this.props;

		window.onpopstate = () => { photoViewClose(); }
		if(!autonomous && pageConf.device === 'desktop') history.push(`/photoview/${postId}`);
		if(autonomous) getPageData(postId);
	}

	render() {
		if(!this.props.photoView.isLoaded) return <Preload />;

		const {
			textareaValue,
			textareaHeight
		} = this.state;
		const {
			like_id,
			user_id,
			photo_id,
			user_name,
			avatar_50,
			photo_600,
			photo_title,
			photo_desc,
			photo_timestamp,
			photo_comments,
			photo_likes,
		} = this.props.photoView.postInfo;
		const {
			menu,
			pageConf,
			menuOpen,
		} = this.props;

		return (
			<div className="content_main">
				<Window 
				width={900} 
				onClose={() => this.windowClose()}
				zIndex={800}
				enable={pageConf.device === 'desktop' ? true : false}>
					<div className="photoView">
						<div className="photoView_picture">
							<ImageLoader
							src={photo_600}
							preloader={() => (false)}>
								<Preload color="#fff"/>
							</ImageLoader>
							<PictureBottom
							userId={user_id}
							postId={photo_id}
							title={photo_title}
							desc={photo_desc} />
						</div>
						<div className="photoView_autor">
							<UserBlock 
							userId={user_id}
							userName={user_name}
							userAvatar={avatar_50}
							timeDesc={photo_timestamp}
							ellipsis={true}
							ellipsisOpen={() => menuOpen({
								userId: user_id,
								postId: photo_id,
								userName: user_name
							})} />
						</div>
						<div className="photoView_postInfo">
							<PostInfo
							likeId={like_id}
							postId={photo_id}
							photoLikes={photo_likes}
							photoComments={photo_comments} />
						</div>
						<PostComments />
						<div className="photoView_input" style={{height: textareaHeight}}>
							<TextareaAutosize
							value={textareaValue}
							maxLength={250}
							placeholder="Напишите сообщение..."
							style={{height: textareaHeight, minHeight: 40, maxHeight: 80}}
							onChange={e => this.setState({textareaValue: e.target.value})} 
							onHeightChange={(height) => this.setState({textareaHeight: height})} />
							<button 
							className="fa fa-send" 
							style={{height: textareaHeight}} 
							onClick={() => this.handleSendComment(photo_id, textareaValue)} />
						</div>
					</div>
				</Window>

				{menu.isLoadedInWindow ? 
					<Menu
					goToProfile={true}
					goToRemovePost={true}
					goToFollowUser={true}
					history={this.props.history}
					/> : null}
				{menu.isLoadedMenuRemove ? <MenuRemove />  : null}
			</div>
		)
	}

	handleSendComment(photo_id, textareaValue) {
		textareaValue = textareaValue.replace(/\s+/g, ' ').trim();

		if(textareaValue.length) {
			this.setState({
				textareaHeight: 40,
				textareaValue: ''
			});
			this.props.sendComment(photo_id, textareaValue);
		}
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
	menu: PropTypes.object.isRequired,
	menuOpen: PropTypes.func.isRequired,
	pageConf: PropTypes.object.isRequired,
	photoView: PropTypes.object.isRequired,
	getPageData: PropTypes.func.isRequired,
	sendComment: PropTypes.func.isRequired,
	photoViewClose: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	menu: state.menu,
	pageConf: state.pageConf,
	photoView: state.photoView,
})

const mapDispatchToProps = (dispatch) => ({
	menuOpen: (data) => dispatch(menuOpen(data)),
	photoViewClose: () => dispatch(photoViewClose()),
	getPageData: (postId) => dispatch(photoViewGetPageData(postId)),
	sendComment: (postId, commentText) => dispatch(sendComment(postId, commentText)),

})

export default connect(mapStateToProps, mapDispatchToProps)(PhotoView);