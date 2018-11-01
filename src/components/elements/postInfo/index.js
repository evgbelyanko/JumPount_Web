import React from 'react'

import './index.css'

class PostInfo extends React.Component {

	ellipsis() {
		return (
			<div 
				className="user_action_post fa fa-ellipsis-h" 
				style={{fontSize: 24}}
				//onclick="ellipsisAction('`+obj.user_id+`','`+obj.post_id+`');"
			/>
		)
	}

	render() {
		const { 
			photoLikes,
			photoComments,
			likeId
		} = this.props;

		const LikeClassName = likeId === null ? 'pv_like_off' : 'pv_like_on';

		return (
			<div className="pv_info">
				<div className={LikeClassName}></div>
				<div className="pv_info_counter">
					<div className="fa fa-heart pv_info_counter_icon"></div>
					<div photo_likes_id="0" className="pv_info_counter_text">{photoLikes}</div>
					<div className="fa fa-comment pv_info_counter_icon"></div>
					<div id="pvCounterComments" className="pv_info_counter_text">{photoComments}</div>
				</div>
			</div>
		);
	}
}

export default PostInfo;
