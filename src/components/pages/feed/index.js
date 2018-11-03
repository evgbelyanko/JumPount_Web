import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ImageLoader from 'react-imageloader'
import PostInfo from '../../elements/postInfo'
import UserBlock from '../../elements/userBlock'
import PostBottom from '../../elements/postBottom'
import Menu from '../../elements/menu'
import { logout } from '../../../actions/auth/logout'
import { setActivePage } from '../../../actions/feed'
import './index.css'

class Feed extends React.Component {

	constructor() {
		super();

		this.state = {
			isLoaded: false,
			listPosts: null,
			menu: null,
		};
	}

	componentDidMount() {
		fetch(`/feed/posts`, {
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
			})
		})

		this.props.setActivePage();
	}

	render() {
		if(!this.state.isLoaded) return <img src="/img/preload.gif" className="preload_page" alt=""/>;
		
		const {
			menu,
			listPosts
		} = this.state;

		return (
			<div className="feed">
				{listPosts ? this.loadListPosts() : null}
				{menu ? this.createMenu() : null}
			</div>
		);
	}

	loadListPosts() {
		const listPosts = this.state.listPosts.map((post, key) =>
			<div className="feed_post" key={key}>

				<UserBlock 
				userId={post.user_id}
				userName={post.user_name}
				userAvatar={post.avatar_50}
				userDesc={post.photo_timestamp}
				ellipsis="true"
				ellipsisOpen={() => this.openMenu()}
				ellipsisClose={() => this.closeMenu()} />

				<div className="feed_picture">
					<ImageLoader
					src={post.photo_600} 
					preloader={() => (<img src="/img/preload.gif" alt=""/>)} />
					<PostBottom
						title={post.photo_title}
						desc={post.photo_desc}
					/>
				</div>

				<PostInfo
					photoLikes={post.photo_likes}
					photoComments={post.photo_comments}
					likeId={post.like_id}
				/>

			</div>
		);

		return listPosts;
	}

	createMenu() {
		return (
			<Menu onClose={() => this.closeMenu()}/>
		);
	}
	openMenu() { this.setState({ menu: true }) }
	closeMenu() { this.setState({ menu: null }) }

}

Feed.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Feed);