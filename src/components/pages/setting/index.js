import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EditInfo from './editInfo'
import EditAvatar from './editAvatar'
import { logout } from '../../../actions/auth/logout'
import { setActivePage } from '../../../actions/setting'
import './index.css'

class Setting extends React.Component {

	constructor() {
		super();
		this.state = {
			isLoaded: false,
			settingInfo: null,
		};
		
	}

	componentDidMount() {
		fetch(`/setting/getInfo`, {
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
				settingInfo: data
			})
		})
	}

	render() {
		if(!this.state.isLoaded) return false;

		const { settingInfo } = this.state;

		return (
			<div className="setting setting_form">
				<EditAvatar
				settingInfo={settingInfo}/>
				<EditInfo
				settingInfo={settingInfo}/>
			</div>
		);
	}
}

Setting.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
