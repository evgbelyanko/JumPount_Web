import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ImageLoader from 'react-imageloader'

import {
	menuOpen,
	getPageData,
} from '../../../actions/feed'

import PhotoView from '../photoview'
import Menu from '../../elements/menu'
import Preload from '../../elements/preload'
import PostInfo from '../../elements/postInfo'
import UserBlock from '../../elements/userBlock'
import PictureBottom from '../../elements/pictureBottom'

import './index.css'

class Feed extends React.Component {

	componentDidMount() { this.props.getPageData(); }

	render() {
		if(!this.props.pageData.feedPosts) return <Preload />;

		const {
			menu,
			pageData,
			photoView,
		} = this.props;

		return (
			<div className="feed">
				{pageData.feedPosts.length !== 0 ? this.loadFeedPosts() : this.pageEmpty()}
				{photoView.isLoaded ? <PhotoView /> : null}
				{menu.isLoaded ? 
					<Menu 
					goToPost={true}
					followUser={true}
					goToProfile={true}
					/> : null}
			</div>
		);
	}

	loadFeedPosts() {
		const {
			menuOpen,
			pageData,
		} = this.props;

		const readyList = pageData.feedPosts.map((post, key) =>
			<div className="feed_post" key={key}>
				<UserBlock
				ellipsis={true}
				userId={post.user_id}
				userName={post.user_name}
				userAvatar={post.avatar_50}
				userDesc={post.photo_timestamp}
				ellipsisOpen={() => menuOpen({
					userId: post.user_id,
					postId: post.photo_id,
					userName: post.user_name,
				})} />
				<div className="feed_picture">
					<ImageLoader
					src={post.photo_600} 
					preloader={() => (<img src="/img/preload.gif" alt=""/>)} />
					<PictureBottom
					title={post.photo_title}
					desc={post.photo_desc} />
				</div>
				<PostInfo
				a={console.log(post.like_id)}
				photoLikes={post.photo_likes}
				photoComments={post.photo_comments}
				likeId={post.like_id} />
			</div>
		)

		return readyList;
	}

	pageEmpty() {
		return (
			<div className="page_empty">
				<span className="fa fa-picture-o" style={{color: '#000', fontSize: 96}} />
				<span>Нет новых записей.</span>
			</div>
		)
	}
}

Feed.propTypes = {
	menu: PropTypes.object.isRequired,
	menuOpen: PropTypes.func.isRequired,
	pageConf: PropTypes.object.isRequired,
	pageData: PropTypes.object.isRequired,
	getPageData: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	menu: state.menu,
	pageConf: state.pageConf,
	pageData: state.pageData,
	photoView: state.photoView,
})

const mapDispatchToProps = (dispatch) => ({
	getPageData: () => dispatch(getPageData()),
	menuOpen: (data) => dispatch(menuOpen(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed);