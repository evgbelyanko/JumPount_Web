import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { menuRemoveOpen } from '../../../actions/menu'

import { loadMoreComments } from '../../../actions/photoView'

class PostComments extends React.Component {

	constructor(props) {
		super(props)

		const {
			photo_comments
		} = props.photoView.postInfo;

		this.state = {
			startLimit: 10,
			countLimit: 10,
			scrollIsCancelled: false,
			scrollCommentsToBottom: false,
			hiddenComments: photo_comments - 10,
		}
	}

	componentDidMount() { if(this.props.pageConf.device !== 'mobile') this.scrollCommentsToBottom(); }

	componentDidUpdate(prevProps, prevState) {
		if(this.state.scrollCommentsToBottom) this.scrollCommentsToBottom();
	}

	componentWillReceiveProps(nextProps) {
		const { counterComments } = nextProps.photoView;
		if(counterComments === 1) this.setState({scrollCommentsToBottom: true});

		return true;
	}

	scrollCommentsToBottom() {
		const commentsBlock = document.querySelector('.photoView_comments');
		commentsBlock.scrollTop = commentsBlock.scrollHeight;
		this.setState({scrollCommentsToBottom: false});
	}

	render() {
		const { postComments } = this.props.photoView;

		const readyList = postComments.slice(0).reverse().map((item, key) => {
			return (
				<div className="photoView_comments_msg" key={key}>
					<img src={item.avatar_50} alt=""/>
					<div className="photoView_comments_msg_block">
						{+localStorage.userId === +item.user_id ? <div className="fa fa-times-circle photoView_comments_msg_block_delete" onClick={() => this.props.menuRemoveOpen('comment', this.props.photoView.postId, item.comment_id, key)} /> : null}
						<div className="photoView_comments_msg_block_username">{item.user_name}</div>
						<div className="photoView_comments_msg_block_text">{item.comment_text}</div>
					</div>
				</div>
			);
		});

	    return (
			<div className="photoView_comments">
				{this.state.hiddenComments > 0 ? this.loadMoreCommentsButton() : null}
				{postComments.length === 0 ? this.commentsEmpty() : readyList}
			</div>
	    )
	}

	commentsEmpty() {
		return (
			<div className="photoView_comments_empty">
				<div className="fa fa-commenting photoView_comments_empty_icon"></div>
				<div className="photoView_comments_empty_text">Оставьте первый комментарий.</div>
			</div>
		)
	}

	loadMoreCommentsButton() {
		const {
			hiddenComments
		} = this.state;
		
		return (
			<div className="photoView_loadMoreComments">
				<button className="btn_black" onClick={() => this.handleLoadMoreComments()}>
					Ещё комментариев: {hiddenComments}
				</button>
			</div>
		)
	}

	handleLoadMoreComments() {
		const {
			startLimit,
			countLimit,
			hiddenComments
		} = this.state;
		const postId = this.props.photoView.postInfo.photo_id;

		this.props.loadMoreComments(postId, startLimit, countLimit)
		this.setState({
			startLimit: startLimit + 10,
			hiddenComments: hiddenComments - 10
		})
	}
}

PostComments.propTypes = {
	pageConf: PropTypes.object.isRequired,
	photoView: PropTypes.object.isRequired,
	menuRemoveOpen: PropTypes.func.isRequired,
	loadMoreComments: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	pageConf: state.pageConf,
	photoView: state.photoView,
})

const mapDispatchToProps = (dispatch) => ({
	menuRemoveOpen: (itemType, postId, itemId, key) => dispatch(menuRemoveOpen(itemType, postId, itemId, key)),
	loadMoreComments: (postId, startLimit, countLimit) => dispatch(loadMoreComments(postId, startLimit, countLimit)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostComments);