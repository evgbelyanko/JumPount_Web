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
		const postList = this.props.profilePosts.map((post, key) => {
			return (
				<div className="profile_gallery_item" key={key}>
					<div className="profile_gallery_item_image">
						<img 
						src={post.photo_250} 
						className="picture_shadow" 
						onClick={() => this.openPhotoView(post.photo_id)} 
						alt=""/>
					</div>
				</div>
			);
		});
	    return (
			<div className="profile_content">
				<div className="profile_gallery">
					{postList}
				</div>
				{this.state.postPhotoViewId ? this.createPhotoView() : null}
			</div>
	    );
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