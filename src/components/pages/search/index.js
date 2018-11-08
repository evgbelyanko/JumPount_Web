import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
	openMenu,
	closeMenu,
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
			closeMenu,
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
                {menu ? <Menu onClose={() => closeMenu()} /> : null}
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
		const { photoViewOpen } = this.props;

		const readyList = searchPosts.map((post, key) =>
			<div className="search_gallery_item picture_shadow" key={key} >
				<div className="search_gallery_item_link" onClick={() => photoViewOpen(post.photo_id)}>
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
			openMenu,
			searchUsers
		} = this.props;

		const readyList = searchUsers.list.map((user, key) => 
			<UserBlock
			ellipsis={true}
			userId={user.user_id}
			userName={user.user_name}
			userAvatar={user.avatar_50}
			ellipsisOpen={() => openMenu()}
			key={key}/>
		);
		
		return <div className="search_result">{readyList}</div>;
	}

}

Search.propTypes = {
	menu: PropTypes.bool.isRequired,
	openMenu: PropTypes.func.isRequired,
	closeMenu: PropTypes.func.isRequired,
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
	openMenu: () => dispatch(openMenu()),
	closeMenu: () => dispatch(closeMenu()),
	getPageData: () => dispatch(getPageData()),
	photoViewOpen: (postId) => dispatch(photoViewOpen(postId)),
	getSearchUsersFailure: () => dispatch(getSearchUsersFailure()),
	getSearchUsers: (inputField) => dispatch(getSearchUsers(inputField)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);
