import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { menuActionsLike } from '../../../actions/postInfo'

import './index.css'

class PostInfo extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			postId: props.postId,
			photoLikes: props.photoLikes,
			photoComments: props.photoComments,
			buttonClass: props.likeId ? 'btn_black' : 'btn_white',
			buttonText: props.likeId ? 'Вы уже оценили' : 'Мне нравится'
		};
	}

	componentWillReceiveProps(nextProps) {
		const { counterComments } = nextProps.photoView;
		if(counterComments) this.setState({ photoComments: this.state.photoComments + counterComments });
	}

	render() {
		const {
			postId,
			photoLikes,
			buttonText,
			buttonClass,
			photoComments
		} = this.state;

		return (
			<div className="postInfo">
				<button className={buttonClass} onClick={() => this.actionsLike(postId)}>
					{buttonText}
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

	actionsLike(postId) {
		const {
			photoLikes,
			buttonClass
		} = this.state;
		const { menuActionsLike } = this.props;

		this.setState({
			buttonClass: buttonClass === 'btn_white' ? 'btn_black' : 'btn_white',
			photoLikes: buttonClass === 'btn_white' ? photoLikes + 1 : photoLikes - 1,
			buttonText: buttonClass === 'btn_white' ? 'Вы уже оценили' : 'Мне нравится'
		})

		menuActionsLike(postId)
	}
}

PostInfo.propTypes = {
	pageData: PropTypes.object.isRequired,
	photoView: PropTypes.object.isRequired,
	menuActionsLike: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	pageData: state.pageData,
	photoView: state.photoView,
})


const mapDispatchToProps = (dispatch) => ({
	menuActionsLike: (postId) => dispatch(menuActionsLike(postId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostInfo);
