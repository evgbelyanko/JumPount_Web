import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PhotoView from '../photoview'
import UserBlock from '../../elements/userBlock'
import Menu from '../../elements/menu'
import { logout } from '../../../actions/auth/logout'
import { setActivePage } from '../../../actions/search'

import './index.css';

class Search extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			menu: null,
			isLoaded: false,
			listPosts: null,
			listUsers: null,
			inputField: null,
			visibleUsers: false,
			visiblePosts: true,
			postPhotoViewId: null,
		};
		
	}

	componentDidMount() {
		fetch(`/search/recent`, {
			credentials: 'include'
		})
		.then(res => res.json())
		.then(data => {
			if(data.error === 401) {
				this.props.logout();
				return false;
			}
			this.setState({
				isLoaded: true,
				listPosts: data.listPosts
			});
		})

		this.props.setActivePage();
	}

	render() {
		if(!this.state.isLoaded) return false;

		const {
			menu,
			visibleUsers,
			visiblePosts,
			postPhotoViewId,
		} = this.state;

		return (
			<div className="search">
        		<div className="search_block">
            		<div className="search_row">
                		<span className="fa fa-search search_icon" />
                		<input id="search_input" className="search_input" placeholder="Поиск пользователя" onChange={evt => this.updateInputValue(evt)}/>
                		<div className="search_send" onClick={() => this.getUsersSearch()}>
                			<span className="fa fa-send"></span>
                		</div>
            		</div>
        		</div>
        		{visibleUsers ? this.createListUsers() : null}
                {visiblePosts ? this.createLastPosts() : null}
                {postPhotoViewId ? this.createPhotoView() : null}
                {menu ? this.createMenu() : null}
    		</div>
		);
	}

	createLastPosts() {
		const listPosts = this.state.listPosts.map((post, key) =>
			<div className="search_gallery_item picture_shadow" key={key} >
				<div className="search_gallery_item_link" onClick={() => this.openPhotoView(post.photo_id)}>
					<div className="search_gallery_item_image">
						<img src={post.photo_250} alt=""/>
					</div>
				</div>
			</div>
		);

		return (
			<div className="search_gallery">
				{listPosts}
			</div>
		);
	}

	updateInputValue(evt) {
		const inputValue = evt.target.value;

	    if(inputValue.length !== 0){
			this.setState({ inputField: inputValue });
	    } else {
			this.setState({ 
				visiblePosts: true,
				visibleUsers: false,
			});
	    }
	}

	getUsersSearch() {
		const { inputField } = this.state;

		fetch(`/search/users?name=${inputField}`)
		.then(res => res.json())
		.then(data => {
			this.setState({
				visibleUsers: true,
				visiblePosts: false,
				listUsers: data.listUsers,
			});
		})
		.catch(err => {
			
		});
	}

	createListUsers() {
		const listUsers = this.state.listUsers.map((user, key) => 
			<UserBlock 
			userId={user.user_id}
			userName={user.user_name}
			userAvatar={user.avatar_50}
			ellipsis="true"
			ellipsisOpen={() => this.openMenu()}
			ellipsisClose={() => this.closeMenu()}
			key={key}/>
		);
		
		return (
			<div className="search_result">
				{listUsers}
			</div>
		);
	}

	createPhotoView() {
		return (
			<PhotoView
			onClose={() => this.closePhotoView()}
			postPhotoViewId={this.state.postPhotoViewId} />
		);
	}
    openPhotoView(postPhotoViewId) { this.setState({ postPhotoViewId: postPhotoViewId }) }
    closePhotoView() { this.setState({ postPhotoViewId: null }) }

	createMenu() {
		return (
			<Menu onClose={() => this.closeMenu()} />
		);
	}
	openMenu() { this.setState({ menu: true }) }
	closeMenu() { this.setState({ menu: null }) }

}

Search.propTypes = {
	page: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired,
	setActivePage: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	page: state.page,
})

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logout()),
	setActivePage: () => dispatch(setActivePage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);
