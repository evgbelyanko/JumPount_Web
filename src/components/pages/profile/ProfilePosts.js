import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { photoViewOpen } from '../../../actions/profile'

class ProfilePosts extends React.Component {

	render() {
		const { profilePosts } = this.props.pageData.profile;

	    return (
				<div className="profile_gallery">
					{profilePosts.length !== 0 ? this.postList() : this.pageEmpty()}
				</div>
	    )
	}

	postList() {
		const { profilePosts } = this.props.pageData.profile;

		const readyList = profilePosts.map((post, key) => {
			return ( 
				<div className="profile_gallery_post" key={key}>
					<img 
					src={post.photo_250} 
					className="picture_shadow" 
					onClick={() => this.photoViewCreate(post.photo_id)} 
					alt=""/>
				</div>
			)
		})

		return readyList;
	}

	photoViewCreate(postId) {
		const {
			history,
			pageConf,
			photoViewOpen,
		} = this.props;

		pageConf.device === 'desktop' ? photoViewOpen(postId) : history.push(`/photoview/${postId}`);
	}

	pageEmpty() {
		return (
			<div className="profile_postsEmpty">
				<span className="fa fa-paste" style={{color: '#000', fontSize: 64}} />
				<span>Публикации отсутствуют.</span>
			</div>
		)
	}
}

ProfilePosts.propTypes = {
	pageConf: PropTypes.object.isRequired,
	pageData: PropTypes.object.isRequired,
	photoViewOpen: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	pageConf: state.pageConf,
	pageData: state.pageData,
})

const mapDispatchToProps = (dispatch) => ({
	photoViewOpen: (postId) => dispatch(photoViewOpen(postId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePosts);