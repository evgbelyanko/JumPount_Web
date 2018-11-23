import './index.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
	authGoogle,
	authFacebook,
	authVkontakte
} from '../../../actions/auth/login'
import { setPageConf } from '../../../actions/auth/index'
//import VkAuth from 'react-vk-auth'
import { Redirect } from 'react-router'

class Auth extends Component {

	componentDidMount() { this.props.setPageConf(); }

	render() {
		if(localStorage.userId) return <Redirect to='/feed'/>;

		return(
			<div className="auth_back">
				<div className="auth_block">
					<div className="auth_icon"></div>
					<div className="auth_name cursive">JUMPOINT</div>
					<div className="auth_method_text">Авторизация через:</div>
					<div className="auth_btn" onClick={() => this.props.authVkontakte()}>
						<span className="fa fa-vk"></span>
						<span className="auth_btn_text">Vkontakte</span>
					</div>
					<div className="auth_btn" onClick={() => this.props.authFacebook()}>
						<span className="fa fa-facebook"></span>
						<span className="auth_btn_text">Facebook</span>
					</div>
					<div className="auth_btn" onClick={() => this.props.authGoogle()}>
						<span className="fa fa-google"></span>
						<span className="auth_btn_text">Google</span>
					</div>
				</div>
			</div>
		)
	}
}

Auth.propTypes = {
	pageConf: PropTypes.object.isRequired,
	setPageConf: PropTypes.func.isRequired,
	authGoogle: PropTypes.func.isRequired,
	authFacebook: PropTypes.func.isRequired,
	authVkontakte: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	pageConf: state.pageConf,
})

const mapDispatchToProps = (dispatch) => ({
	setPageConf: () => dispatch(setPageConf()),
	authGoogle: () => dispatch(authGoogle()),
	authFacebook: () => dispatch(authFacebook()),
	authVkontakte: () => dispatch(authVkontakte()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)