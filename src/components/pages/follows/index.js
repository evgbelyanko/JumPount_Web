import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { history } from './../../../store'

import Menu from '../../elements/menu'
import Window from '../../elements/window'
import Preload from '../../elements/preload'
import UserBlock from '../../elements/userBlock'

import {
	menuOpen,
	followsClose,
	followsGetPageData,
} from '../../../actions/follows'

import './index.css'

class Follows extends React.Component {

	constructor(props) {
		super(props)

		const {
			page,
			userId,
			isLoaded
		} = props.follows;

		this.state = {
			titlePage: false,
			autonomous: isLoaded ? false : true,
			userId: isLoaded ? userId : props.match.params.userId,
			page: isLoaded ? page : props.match.path.match(/\/(.*?)\//)[1],
		};
	}

	componentDidMount() {
		const {
			page,
			userId,
			autonomous
		} = this.state;

		const {
			getPageData,
			followsClose,
		} = this.props;

		window.onpopstate = () => { followsClose(); }
		if(!autonomous) history.push(`/${page}/${userId}`);
		if(autonomous) getPageData(page, userId);

		this.setState({titlePage: page === 'followers' ? 'Подписчики' : 'Подписки'})
	}

	render() {
		if(!this.props.follows.isLoaded) return <Preload />;

		const {
			menu,
			follows,
			pageConf,
		} = this.props;

		return (
			<div className="follow">
				<Window 
				width={600} 
				onClose={() => this.windowClose()}
				enable={pageConf.device === 'desktop' ? true : false}>
					<div className="follow">
						<div className="follow_name_block">
							<div className="follow_name_block_row">
								<span className="fa fa-user follow_icon"></span>
								<div className="follow_page_name">{this.state.titlePage} {follows.ownerUserName}</div>
							</div>
						</div>
						<div className="follow_result">
							{ this.listUsers() }
						</div>
					</div>
				</Window>
				{menu.isLoadedInWindow ? 
					<Menu 
					goToProfile={true}
					goToFollowUser={true}
					history={this.props.history}
					/> : null}
			</div>
		)
	}

	listUsers() {
		const {
			follows,
			menuOpen,
		} = this.props;

		const readyList = follows.listUsers.map((user, key) => 
			<UserBlock
			key={key}
			userId={user.user_id}
			userName={user.user_name}
			userAvatar={user.avatar_50}
			ellipsis="true"
			ellipsisOpen={() => menuOpen({
				userId: user.user_id,
				userName: user.user_name
			})} />
		);

		return readyList.length !== 0 ? readyList : this.pageEmpty();
	}

	pageEmpty() {
		return (
			<div className="follow_postsEmpty">
				<span className="fa fa-user-circle" style={{color: '#000', fontSize: 96}} />
				<span>Пользователей не найдено.</span>
			</div>
		)
	}

	windowClose() {
		const { followsClose } = this.props;
		const { 
			userId,
			autonomous 
		} = this.state;

		if(autonomous){
			this.props.history.push(`/user/${userId}`);
			followsClose();
		} else {
			history.goBack();
		}
	}

}

Follows.propTypes = {
	menu: PropTypes.object.isRequired,
	menuOpen: PropTypes.func.isRequired,
	pageConf: PropTypes.object.isRequired,
	getPageData: PropTypes.func.isRequired,
	followsClose: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	menu: state.menu,
	follows: state.follows,
	pageConf: state.pageConf,
})

const mapDispatchToProps = (dispatch) => ({
	menuOpen: (data) => dispatch(menuOpen(data)),
	followsClose: () => dispatch(followsClose()),
	getPageData: (pageFollows, userId) => dispatch(followsGetPageData(pageFollows, userId)),

})

export default connect(mapStateToProps, mapDispatchToProps)(Follows);