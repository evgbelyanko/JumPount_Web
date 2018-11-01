import React from 'react'

export default class PostComments extends React.Component {

	render() {
		const postCommentsList = this.props.postComments.map((item, key) => {
			return (
				<div className="pv_msg" key={key}>
					<img src={item.avatar_50} alt=""/>
					<div className="pv_msg_block">
						<div className="pv_mg_head">
							<div className="pv_msg_username">{item.user_name}</div>
						</div>
						<div className="pv_msg_text">{item.comment_text}</div>
					</div>
				</div>
			);
		});
	    return (
			<div className="pv_comments">
				{postCommentsList}
			</div>
	    );
	}

}