import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Window from '../../elements/window'
import UserBlock from '../../elements/userBlock'
import Menu from '../../elements/menu'
import './index.css'
import { logout } from '../../../actions/auth/logout'
import { setActivePage } from '../../../actions/follows'

class Follows extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			isLoaded: false,
			ownerUsername: null,
			listUsers: [],
			menu: null,
		}

	}

	componentDidMount() {
		fetch(`/follows/users?
			page=${this.props.pageFollows}&
			userid=${this.props.userId}`, {
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
	}

	render() {
		if(!this.state.isLoaded) return false;

		const {
			menu,
			ownerUsername
		} = this.state;

		return (
			<div>
				<Window 
				width={600} 
				onClose={() => this.props.onClose()}
				>
					<div className="follow">
						<div className="follow_name_block">
							<div className="follow_name_block_row">
					    		<span className="fa fa-user follow_icon"></span>
					    		<div className="follow_page_name">{ownerUsername}</div>
							</div>
						</div>
						<div id="follow_output" className="follow_result">
							{ this.listUsers() }
						</div>
					</div>
				</Window>
				{menu ? this.createMenu() : null}
			</div>
		);
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
			<Menu onClose={() => this.closeGroupButton()} />
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