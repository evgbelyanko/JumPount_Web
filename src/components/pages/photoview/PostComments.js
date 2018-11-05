import React from 'react'

export default class PostComments extends React.Component {

	render() {
		const postCommentsList = this.props.postComments.map((item, key) => {
			return (
				<div className="photoView_comments_msg" key={key}>
					<img src={item.avatar_50} alt=""/>
					<div className="photoView_comments_msg_block">
						<div className="photoView_comments_msg_block_username">{item.user_name}</div>
						<div className="photoView_comments_msg_block_text">{item.comment_text}</div>
					</div>
				</div>
			);
		});
	    return (
			<div className="photoView_comments">
				{postCommentsList}
			</div>
	    );
	}

}