import React from 'react'

import PhotoView from '../photoview'

export default class ProfilePosts extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			postPhotoViewId: null,
		}
	}

	render() {
	    return (
			<div className="profile_gallery">
				{this.postList()}
				{this.state.postPhotoViewId ? this.createPhotoView() : null}
			</div>
	    );
	}

	postList() {
		const postList = this.props.profilePosts.map((post, key) => {
			return ( 
				<div className="profile_gallery_post" key={key}>
					<img 
					src={post.photo_250} 
					className="picture_shadow" 
					onClick={() => this.openPhotoView(post.photo_id)} 
					alt=""/>
				</div>
			)
		})

		return postList;
	}

	createPhotoView() {
			return (
				<PhotoView
					onClose={() => this.closePhotoView()}
					postPhotoViewId={this.state.postPhotoViewId}
				/>
			);
	}
    openPhotoView(postPhotoViewId) { this.setState({ postPhotoViewId: postPhotoViewId }) }
    closePhotoView() { this.setState({ postPhotoViewId: null }) }

}