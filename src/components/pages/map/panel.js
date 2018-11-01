import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../../actions/auth/logout'

import './panel.css'

class Panel extends React.Component {
	constructor() {
		super();

		this.state = {
			isLoaded: false,
			listPosts: null,
			postPhotoViewId: null,
		};
	}

	getPostsFromServer(markersIds) {
		fetch('http://localhost:8000/map/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({markerIds: markersIds})
		})
		.then(res => res.json())
		.then(data => {
			if(data.error === 401) {
				this.props.logout();
				return false;
			}
			this.setState({
				isLoaded: true,
				listPosts: data.listPosts
			});
		})
	}

	componentDidMount() {
		this.getPostsFromServer(this.props.markersIds)
	}

	componentWillReceiveProps(nextProps){
		this.getPostsFromServer(nextProps.markersIds)
	}

	render() {
		if(!this.state.isLoaded) return false;

		return (
			<div className="map_panel">
				{this.loadListPosts()}
    		</div>
		);
	}

	loadListPosts() {
		const listPosts = this.state.listPosts.map((post, key) =>
			<div className="map_href_item" onClick={() => this.onOpenPhotoView(post.photo_id)} key={key}>
				<div className="map_item">
					<img src={post.photo_250} className="map_item_photo picture_shadow" alt=""/>
					<div className="map_item_info">
						<div className="map_item_data">
							<div className="map_item_user">
								<img src={post.avatar_50} className="map_item_user_avatar" alt=""/>
								<div className="map_item_user_name">{post.user_name}</div>
							</div>
						</div>
						<div className="map_item_photo_title">{post.photo_title}</div>
						<div className="map_item_counter">
							<div className="fa fa-heart map_item_counter_icon"></div>
							<div className="map_item_counter_text">{post.photo_likes}</div>
							<div className="fa fa-comment map_item_counter_icon"></div>
							<div className="map_item_counter_text">{post.photo_comments}</div>
						</div>
					</div>
				</div>
			</div>
		);

		return listPosts;
	}

	onOpenPhotoView(postPhotoViewId){
		if (this.props.openPhotoView) {
			this.props.openPhotoView(postPhotoViewId);
		}
	}

}

Panel.propTypes = {
	logout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	
})

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
