import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { history } from './../../../store'

import Menu from '../../elements/menu'
import Window from '../../elements/window'
import UserBlock from '../../elements/userBlock'

import { logout } from '../../../actions/auth/logout'
import { setActivePage } from '../../../actions/follows'

import './index.css'

class Follows extends React.Component {

	constructor() {
		super()

		this.state = {
			isLoaded: false,
			ownerUsername: null,
			listUsers: [],
			menu: null,
		}

	}

	componentDidMount() {
		const userId = this.props.userId ? this.props.userId : this.props.match.params.userId;
		const pageFollows = this.props.pageFollows ? this.props.pageFollows : this.props.match.params.pageFollows;

		const {
			page,
			onClose
		} = this.props;

		if(pageFollows && userId) window.onpopstate = () => { onClose() }
		if(page.device === 'desktop') history.push(`/${pageFollows}/${userId}`);


		fetch(`/follows/users?page=${pageFollows}&userid=${userId}`, {
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
				ownerUsername: data.ownerUserName,
				listUsers: data.listUsers
			})
		})

		this.props.setActivePage();
	}

	componentWillUpdate() {
		history.replace(`/user${this.defUserId()}`);
	}

	render() {
		if(!this.state.isLoaded) return false;

		return this.props.page.device === 'desktop' ? this.desktopVersion() : this.mobileVersion();
	}

	content() {
		return (
			<div>
				<div className="follow_name_block">
					<div className="follow_name_block_row">
						<span className="fa fa-user follow_icon"></span>
						<div className="follow_page_name">{this.state.ownerUsername}</div>
					</div>
				</div>
				<div id="follow_output" className="follow_result">
					{ this.listUsers() }
				</div>
			</div>
		)
	}

	desktopVersion() {
		return (
			<div>
				<Window 
				width={600} 
				onClose={() => this.props.onClose()} >
					<div className="follow">
						{this.content()}
					</div>
				</Window>
				{this.state.menu ? this.createMenu() : null}
			</div>
		)
	}

	mobileVersion() {
		return (
			<div className="follow">
				{this.content()}
				{this.state.menu ? this.createMenu() : null}
			</div>
		)
	}


	listUsers() {
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

		return listUsers;
	}

	createMenu() {
		return (
			<Menu onClose={() => this.closeMenu()} />
		);
	}
	openMenu() { this.setState({ menu: true }) }
	closeMenu() { this.setState({ menu: null }) }

}

Follows.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Follows);