import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Menu from '../../elements/menu'
import { Redirect } from 'react-router'
import PostComments from './PostComments'
import Window from '../../elements/window'
import { history } from './../../../store'
import ImageLoader from 'react-imageloader'
import PostInfo from '../../elements/postInfo'
import UserBlock from '../../elements/userBlock'
import PostBottom from '../../elements/postBottom'
import { logout } from '../../../actions/auth/logout'
import { setActivePage } from '../../../actions/photoView'
import './index.css'

class PhotoView extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			isLoaded: false,
			postInfo: null,
			postComments: [],
			menu: null,
		}
	}

	componentDidMount() {
		if(this.props.postPhotoViewId)
			window.onpopstate = () => { this.props.onClose() }

		const photoId = this.props.postPhotoViewId ? this.props.postPhotoViewId : this.props.match.params.id;
		history.push('/photoview/'+photoId);

		fetch(`/photoview/post?id=${photoId}`, {
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
				postInfo: data.postInfo,
				postComments: data.postComments
			});
		})
	}

	render() {
		if(!this.state.isLoaded) return false;
		
		const {
			user_id,
			user_name,
			avatar_50,
			photo_600,
			photo_title,
			photo_desc,
			photo_timestamp,
			photo_comments,
			photo_likes,
			like_id
		} = this.state.postInfo;

		return (
			<div>
				{this.state.redirect ? <Redirect push to={'/profile/'+user_id} /> : null}
				<Window 
				width={900} 
				onClose={() => this.closePhotoView()}
				zIndex={800}>
					<div className="window">
						<div id="" className="window_right">
							<div className="pv_autor">
								<UserBlock 
								userId={user_id}
								userName={user_name}
								userAvatar={avatar_50}
								userDesc={photo_timestamp}
								ellipsis="true"
								ellipsisOpen={() => this.openMenu()}
								ellipsisClose={() => this.closeMenu()} />
							</div>
							<div className="pv_picture_layer_mobile" />
							<div className="window_part"> 
								<PostInfo
								photoLikes={photo_likes}
								photoComments={photo_comments}
								likeId={like_id} />
								<PostComments 
								postComments={this.state.postComments} />
								<div className="pv_input">
									<textarea className="pv_new_comment" placeholder="Напишите сообщение..." />
									<div className="pv_send_comment">
										<span className="fa fa-send" />
									</div>
								</div>
							</div>
						</div>
						<div className="pv_picture_layer">
							<ImageLoader
							src={photo_600} 
							className="pv_picture"
							preloader={() => (<img src="/img/preload.gif" alt=""/>)} />
							<PostBottom
							title={photo_title}
							desc={photo_desc} />
						</div>
					</div>
				</Window>
				{this.state.menu ? this.createMenu() : null}
			</div>
		);
	}

	closePhotoView() {
		if(this.props.postPhotoViewId){
			history.goBack();
			this.props.onClose();
		} else {
			this.setState({ redirect: true })
		}
	}

	createMenu() {
		return ( <Menu onClose={() => this.closeMenu()} /> );
	}
    openMenu() { this.setState({ menu: true }) }
    closeMenu() { this.setState({ menu: null }) }

}

PhotoView.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(PhotoView);
