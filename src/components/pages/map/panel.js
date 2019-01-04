import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
	photoViewOpen,
	getPanelPosts
} from '../../../actions/map'

class Panel extends React.Component {

	componentDidMount() { this.props.getPanelPosts(this.props.markersIds) }

	componentWillReceiveProps(nextProps){
		const {
			markersIds,
			getPanelPosts
		} = this.props;

		if(markersIds !== nextProps.markersIds) getPanelPosts(nextProps.markersIds);
	}

	render() {
		if(!this.props.panelPosts.isLoaded) return false;

		return (
			<div className="map_panel">
				{this.loadListPosts()}
    		</div>
		)
	}

	loadListPosts() {
		const { panelPosts } = this.props;

		const readyList = panelPosts.listPosts.map((post, key) =>
			<div className="map_post" onClick={() => this.photoViewCreate(post.photo_id)} key={key}>
				<img src={post.photo_250} className="map_post_picture picture_shadow" alt=""/>
				<div className="map_post_info">
					<div className="map_post_user">
						<img src={post.avatar_50} className="map_post_user_avatar" alt=""/>
						<div className="map_post_user_name">{post.user_name}</div>
					</div>
					<div className="map_post_photo_title">{this.handleTitle(post.photo_title)}</div>
{/*					<div className="map_post_counter">
						<span className="fa fa-heart map_post_counter_icon" />
						<span className="map_post_counter_text">{post.photo_likes}</span>
						<span className="fa fa-comment map_post_counter_icon" />
						<span className="map_post_counter_text">{post.photo_comments}</span>
					</div>*/}
				</div>
			</div>
		);

		return readyList;
	}

	handleTitle(title) {
		const titleSize = 30;
		title = title.length > 40 ?	title.slice(0, titleSize-3) + '...' : title;

		return title;
	}

	photoViewCreate(postId) {
		const {
			history,
			pageConf,
			photoViewOpen,
		} = this.props;

		pageConf.device === 'desktop' ? photoViewOpen(postId) : history.push(`/photoview/${postId}`);
	}

}

Panel.propTypes = {
	pageConf: PropTypes.object.isRequired,
	getPanelPosts: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	pageConf: state.pageConf,
	panelPosts: state.panelPosts,
})

const mapDispatchToProps = (dispatch) => ({
	photoViewOpen: (postId) => dispatch(photoViewOpen(postId)),
	getPanelPosts: (markersIds) => dispatch(getPanelPosts(markersIds)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
