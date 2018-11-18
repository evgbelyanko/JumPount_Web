import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
	menuOpen,
	getPageData,
	photoViewOpen,
	getSearchUsers,
	getSearchUsersFailure,
} from '../../../actions/search'

import PhotoView from '../photoview'
import Menu from '../../elements/menu'
import Preload from '../../elements/preload'
import UserBlock from '../../elements/userBlock'

import './index.css';

class Search extends React.Component {

	constructor() {
		super();

		this.state = {
			inputField: null
		};
	}

	componentDidMount() { this.props.getPageData(); }

	render() {
		if(!this.props.pageData.searchPosts) return <Preload />;

		const {
			menu,
			photoView,
			searchUsers,
		} = this.props;
		
		const { inputField } = this.state;

		return (
			<div className="search">
				<div className="search_block">
					<div className="search_row">
						<span className="fa fa-search search_icon" />
						<input id="search_input" className="search_input" placeholder="Поиск пользователя" onChange={evt => this.updateInputValue(evt)}/>
						<div className="search_send" onClick={() => this.props.getSearchUsers(inputField)}>
							<span className="fa fa-send"></span>
						</div>
					</div>
				</div>
				{searchUsers.isLoaded ? this.createListUsers() : this.createLastPosts()}
				{photoView.isLoaded ? <PhotoView /> : null}
				{menu.isLoaded ? 
					<Menu 
					goToPost={true}
					goToProfile={true}
					goToFollowUser={true}
					history={this.props.history}
					/> : null}
			</div>
		);
	}

	updateInputValue(evt) {
		const inputValue = evt.target.value;
		const { getSearchUsersFailure } = this.props;

		inputValue.length !== 0 ? this.setState({ inputField: inputValue }) : getSearchUsersFailure();
	}

	createLastPosts() {
		const { searchPosts } = this.props.pageData;

		const readyList = searchPosts.map((post, key) =>
			<div className="search_gallery_item picture_shadow" key={key} >
				<div className="search_gallery_item_link" onClick={() => this.photoViewCreate(post.photo_id)}>
					<div className="search_gallery_item_image">
						<img src={post.photo_250} alt=""/>
					</div>
				</div>
			</div>
		);

		return <div className="search_gallery">{readyList}</div>;
	}

	createListUsers() {
		const {
			menuOpen,
			searchUsers
		} = this.props;

		const readyList = searchUsers.list.map((user, key) => 
			<UserBlock
			key={key}
			ellipsis={true}
			userId={user.user_id}
			userName={user.user_name}
			userAvatar={user.avatar_50}
			ellipsisOpen={() => menuOpen({
				userId: user.user_id,
				userName: user.user_name
			})} />
		);

		return (
			<div className="search_result">
				{readyList.length !== 0 ? readyList : this.pageEmpty()}
			</div>
		)
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
			<div className="search_postsEmpty">
				<span className="fa fa-user-circle" style={{color: '#000', fontSize: 96}} />
				<span>Пользователей не найдено.</span>
			</div>
		)
	}
}

Search.propTypes = {
	menu: PropTypes.object.isRequired,
	menuOpen: PropTypes.func.isRequired,
	pageConf: PropTypes.object.isRequired,
	pageData: PropTypes.object.isRequired,
	getPageData: PropTypes.func.isRequired,
	searchUsers: PropTypes.object.isRequired,
	photoViewOpen: PropTypes.func.isRequired,
	getSearchUsers: PropTypes.func.isRequired,
	getSearchUsersFailure: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	menu: state.menu,
	pageConf: state.pageConf,
	pageData: state.pageData,
	photoView: state.photoView,
	searchUsers: state.searchUsers,
})

const mapDispatchToProps = (dispatch) => ({
	getPageData: () => dispatch(getPageData()),
	menuOpen: (data) => dispatch(menuOpen(data)),
	photoViewOpen: (postId) => dispatch(photoViewOpen(postId)),
	getSearchUsersFailure: () => dispatch(getSearchUsersFailure()),
	getSearchUsers: (inputField) => dispatch(getSearchUsers(inputField)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);
