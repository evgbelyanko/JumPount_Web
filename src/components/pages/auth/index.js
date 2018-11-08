import './index.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { authVkontakte } from '../../../actions/auth/login'
import { setPageConf } from '../../../actions/auth/index'
import VkAuth from 'react-vk-auth'
import { Redirect } from 'react-router'

class Auth extends Component {

	componentDidMount() { this.props.setPageConf(); }

	render() {
		if(localStorage.token) return <Redirect to='/'/>;

		return(
			<div className="auth_back">
				<div className="auth_block">
					<div className="auth_icon"></div>
					<div className="auth_name cursive">JUMPOINT</div>
					<VkAuth className="auth_btn" apiId="6704784" callback={(sessionData) => this.props.authVkontakte(sessionData)}>
						<span className="auth_vk fa fa-vk"></span>
						<span className="auth_btn_text">Авторизация через VK</span>
					</VkAuth>
					<div className="auth_btn">
						<span className="auth_vk fa fa-facebook"></span>
						<div className="auth_btn_text">Авторизация через Facebook</div>
					</div>
				</div>
			</div>
		)
	}
}

Auth.propTypes = {
	pageConf: PropTypes.object.isRequired,
	setPageConf: PropTypes.func.isRequired,
	authVkontakte: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	pageConf: state.pageConf,
})

const mapDispatchToProps = (dispatch) => ({
	authVkontakte: (sessionData) => dispatch(authVkontakte(sessionData)),
	setPageConf: () => dispatch(setPageConf()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)