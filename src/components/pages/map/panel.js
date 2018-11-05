import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../../actions/auth/logout'

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
			<div className="map_post" onClick={() => this.onOpenPhotoView(post.photo_id)} key={key}>
				<img src={post.photo_250} className="map_post_picture picture_shadow" alt=""/>
				<div className="map_post_info">
					<div className="map_post_user">
						<img src={post.avatar_50} className="map_post_user_avatar" alt=""/>
						<div className="map_post_user_name">{post.user_name}</div>
					</div>
					<div className="map_post_photo_title">{post.photo_title}</div>
					<div className="map_post_counter">
						<span className="fa fa-heart map_post_counter_icon" />
						<span className="map_post_counter_text">{post.photo_likes}</span>
						<span className="fa fa-comment map_post_counter_icon" />
						<span className="map_post_counter_text">{post.photo_comments}</span>
					</div>
				</div>
			</div>
		);

		return listPosts;
	}

	onOpenPhotoView(postPhotoViewId){
		const {
			page,
			history,
			openPhotoView
		} = this.props;

		if(page.device === 'desktop') openPhotoView(postPhotoViewId);
		if(page.device === 'mobile') history.push(`/photoview/${postPhotoViewId}`);
	}

}

Panel.propTypes = {
	page: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	page: state.page,
})

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
