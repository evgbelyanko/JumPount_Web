import React from 'react'

import './index.css'

class PostInfo extends React.Component {

	render() {
		const { 
			photoLikes,
			photoComments,
			likeId
		} = this.props;

		return (
			<div className="postInfo">
				<button className={likeId === null ? 'btn_white' : 'btn_black'}>
					{likeId === null ? 'Мне нравиться' : 'Вы уже оценили'}
				</button>
				<div className="postInfo_counter">
					<span className="fa fa-heart postInfo_counter_icon" />
					<span className="postInfo_counter_text">{photoLikes}</span>
					<span className="fa fa-comment postInfo_counter_icon" />
					<span className="postInfo_counter_text">{photoComments}</span>
				</div>
			</div>
		);
	}
}

export default PostInfo;
