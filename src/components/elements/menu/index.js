import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
	menuClose,
	photoViewOpen,
	menuRemoveOpen,
	menuActionsFollowing,
} from '../../../actions/menu'
import { userLogout } from '../../../actions/auth/logout'

import Window from '../window'

import './index.css';

class Menu extends React.Component {

	checkFollows() {
		const {
			userName,
			following,
		} = this.props.menu;

		return following ? `Отписаться от ${userName}` : `Подписаться на ${userName}`;
	}

	render() {
		const {
			menu,
			goToPost,
			menuClose,
			userLogout,
			goToProfile,
			goToSetting,
			menuRemoveOpen,
			goToFollowUser,
			goToRemovePost,
			goToUserLogout,
			menuActionsFollowing,
		} = this.props;

		return (
			<Window 
			width={500} 
			onClose={() => menuClose()}
			zIndex={820}
			enable={true}>
				<div className="wrap_btn_group">
					{goToFollowUser && +localStorage.userId !== +menu.userId ? <div className="wrap_btn" onClick={() => menuActionsFollowing(menu.userId)}>{this.checkFollows()}</div> : null}
					{goToSetting && +localStorage.userId === +menu.userId ? <Link to="/setting" className="wrap_btn">Настройки профиля</Link> : null}
					{goToRemovePost && +localStorage.userId === +menu.userId ? <div className="wrap_btn" onClick={() => menuRemoveOpen('post', menu.postId, menu.postId)}>Удалить пост</div> : null}
					{goToProfile ? <Link to={`/user/${menu.userId}`} className="wrap_btn">Перейти к пользователю</Link> : null}
					{goToPost ? <div className="wrap_btn" onClick={() => this.photoViewCreate(menu.postId)}>Перейти к записи</div> : null}
					{goToUserLogout && +localStorage.userId === +menu.userId ? <div className="wrap_btn" onClick={() => userLogout()}>Выход из профиля</div> : null}
					<div className="wrap_btn" onClick={() => menuClose()}>Закрыть окно</div>
				</div>
			</Window>
		)
	}

	photoViewCreate(postId) {
		const {
			history,
			pageConf,
			menuClose,
			photoViewOpen,
		} = this.props;

		if(pageConf.device === 'desktop'){
			photoViewOpen(postId);
		} else {
			menuClose();
			history.push(`/photoview/${postId}`);
		}
	}
}

Menu.propTypes = {
	menuClose: PropTypes.func.isRequired,
	pageConf: PropTypes.object.isRequired,
	userLogout: PropTypes.func.isRequired,
	photoViewOpen: PropTypes.func.isRequired,
	menuRemoveOpen: PropTypes.func.isRequired,
	menuActionsFollowing: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	menu:  state.menu,
	pageConf: state.pageConf,
})

const mapDispatchToProps = (dispatch) => ({
	menuClose: () => dispatch(menuClose()),
	userLogout: () => dispatch(userLogout()),
	photoViewOpen: (postId) => dispatch(photoViewOpen(postId)),
	menuActionsFollowing: (userId) => dispatch(menuActionsFollowing(userId)),
	menuRemoveOpen: (itemType, postId, itemId) => dispatch(menuRemoveOpen(itemType, postId, itemId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
