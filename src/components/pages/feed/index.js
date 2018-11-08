import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ImageLoader from 'react-imageloader'

import {
	openMenu,
	closeMenu,
	getPageData,
} from '../../../actions/feed'

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
			closeMenu
		} = this.props;
		
		const { feedPosts } = this.props.pageData;

		return (
			<div className="feed">
				{feedPosts ? this.loadFeedPosts() : null}
				{menu ? <Menu onClose={() => closeMenu()} /> : null}
			</div>
		);
	}

	loadFeedPosts() {
		const { feedPosts } = this.props.pageData;

		const readyList = feedPosts.map((post, key) =>
			<div className="feed_post" key={key}>
				<UserBlock 
				userId={post.user_id}
				userName={post.user_name}
				userAvatar={post.avatar_50}
				userDesc={post.photo_timestamp}
				ellipsis="true"
				ellipsisOpen={() => this.props.openMenu()}
				ellipsisClose={() => this.props.closeMenu()} />
				<div className="feed_picture">
					<ImageLoader
					src={post.photo_600} 
					preloader={() => (<img src="/img/preload.gif" alt=""/>)} />
					<PictureBottom
					title={post.photo_title}
					desc={post.photo_desc} />
				</div>
				<PostInfo
				photoLikes={post.photo_likes}
				photoComments={post.photo_comments}
				likeId={post.like_id} />
			</div>
		)

		return readyList;
	}
}

Feed.propTypes = {
	menu: PropTypes.bool.isRequired,
	openMenu: PropTypes.func.isRequired,
	closeMenu: PropTypes.func.isRequired,
	pageConf: PropTypes.object.isRequired,
	pageData: PropTypes.object.isRequired,
	getPageData: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	menu: state.menu,
	pageConf: state.pageConf,
	pageData: state.pageData,
})

const mapDispatchToProps = (dispatch) => ({
	openMenu: () => dispatch(openMenu()),
	closeMenu: () => dispatch(closeMenu()),
	getPageData: () => dispatch(getPageData()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed);