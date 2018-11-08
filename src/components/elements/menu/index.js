import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Window from '../../elements/window'
import { userLogout } from '../../../actions/auth/logout'
import './index.css';

class Menu extends React.Component {

	render() {

		return (
			<Window 
			width={500} 
			onClose={() => this.props.onClose()}
			zIndex={820}
			enable={true}>
				<div className="wrap_btn_group">
					<div className="wrap_btn">Отписка</div>
					<Link to="/setting" className="wrap_btn">Настройки профиля</Link>
					<div className="wrap_btn">Перейти к записи</div>
					<div className="wrap_btn">Перейти к профилю пользователя</div>
					<div className="wrap_btn" onClick={() => this.props.userLogout()}>Выход</div>
					<div className="wrap_btn" onClick={() => this.props.onClose()}>
						{/*<div className="fa fa-close wrap_action_icon"/>*/} Закрыть окно
					</div>
				</div>
			</Window>
		);
	}
}

Menu.propTypes = {
	pageConf: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	pageConf: state.pageConf,
})

const mapDispatchToProps = (dispatch) => ({
	userLogout: () => dispatch(userLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
