import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadFeedMorePosts } from '../../../actions/feed'
import { loadSearchMorePosts } from '../../../actions/search'
import { loadProfileMorePosts } from '../../../actions/profile'

import './index.css';

class LoadMore extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			startLimit: 15,
			countLimit: 15,
			hiddenPosts: props.pageData.hidden_posts,
		}
	}

	render() {
		if(this.state.hiddenPosts <= 0) return false;

		return (
			<div className="LoadMore">
				<button className="btn_black" onClick={() => this.loadMorePosts()}>
					Загрузить ещё
				</button>
			</div>
		)
	}

	loadMorePosts() {
		const {
			userId,
			pageConf,
			loadFeedMorePosts,
			loadSearchMorePosts,
			loadProfileMorePosts
		} = this.props;
		let {
			startLimit,
			hiddenPosts
		} = this.state;
		let handleCount = 0;

		switch(pageConf.name) {
			case 'feed':
				handleCount = 15;
				loadFeedMorePosts(startLimit, startLimit);
				break;
			case 'search':
				handleCount = 30;
				startLimit = handleCount;
				loadSearchMorePosts(startLimit, startLimit);
				break;
			case 'profile':
				handleCount = 30;
				startLimit = handleCount;
				loadProfileMorePosts(userId, startLimit, startLimit);
				break;
			default:
				break;
		}

		this.setState({
			startLimit: startLimit + handleCount,
			hiddenPosts: hiddenPosts - handleCount,
		})
	}

}

LoadMore.propTypes = {
	pageConf: PropTypes.object.isRequired,
	loadFeedMorePosts: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	pageConf: state.pageConf,
	pageData: state.pageData,
})

const mapDispatchToProps = (dispatch) => ({
	loadFeedMorePosts: (startLimit, countLimit) => dispatch(loadFeedMorePosts(startLimit, countLimit)),
	loadSearchMorePosts: (startLimit, countLimit) => dispatch(loadSearchMorePosts(startLimit, countLimit)),
	loadProfileMorePosts: (userId, startLimit, countLimit) => dispatch(loadProfileMorePosts(userId, startLimit, countLimit)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoadMore);