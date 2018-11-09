import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { menuClose } from '../../../actions/menu'
import { userLogout } from '../../../actions/auth/logout'

import Window from '../../elements/window'

import './index.css';

class Menu extends React.Component {

	checkFollows() {
		const {
			userName,
			follow_id,
		} = this.props.menu;

		return follow_id ? `Отписаться от ${userName}` : `Подписаться на ${userName}`;
	}

	render() {
		const {
			menu,
			goToPost,
			menuClose,
			userLogout,
			followUser,
			goToProfile,
			goToSetting,
			goToUserLogout,
		} = this.props;
		console.log(menu)
		return (
			<Window 
			width={500} 
			onClose={() => menuClose()}
			zIndex={820}
			enable={true}>
				<div className="wrap_btn_group">
					{followUser && +localStorage.userId !== menu.userId ? <div className="wrap_btn">{this.checkFollows()}</div> : null}
					{goToSetting && +localStorage.userId === menu.userId ? <Link to="/setting" className="wrap_btn">Настройки профиля</Link> : null}
					{goToProfile ? <div className="wrap_btn">Перейти к пользователю</div> : null}
					{goToPost ? <div className="wrap_btn">Перейти к записи</div> : null}
					{goToUserLogout && +localStorage.userId === menu.userId ? <div className="wrap_btn" onClick={() => userLogout()}>Выход из профиля</div> : null}
					<div className="wrap_btn" onClick={() => menuClose()}>Закрыть окно</div>
				</div>
			</Window>
		);
	}
}

Menu.propTypes = {
	menuClose: PropTypes.func.isRequired,
	pageConf: PropTypes.object.isRequired,
	userLogout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	menu:  state.menu,
	pageConf: state.pageConf,
})

const mapDispatchToProps = (dispatch) => ({
	menuClose: () => dispatch(menuClose()),
	userLogout: () => dispatch(userLogout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
