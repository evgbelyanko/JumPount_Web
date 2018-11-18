import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
	menuRemovePost,
	menuRemoveClose,
	menuRemoveComment
} from '../../../actions/menu'

import Window from '../window'

import './index.css';

class MenuRemove extends React.Component {


	render() {
		const {
			menu,
			menuRemoveClose,
		} = this.props;
		const textType = menu.itemType === 'post' ? 'фотографию' : 'комментарий';

		return (
			<Window 
			width={500} 
			onClose={() => menuRemoveClose()}
			zIndex={900}
			enable={true}>
				<div className="wrap_btn_group">
					<div className="wrap_btn">Действительно удалить {textType}?</div>
					<div>
						<div className="wrap_btn_left" onClick={() => this.removeItem()}>Да, удалить.</div>
						<div className="wrap_btn_right" onClick={() => menuRemoveClose()}>Нет, закрыть окно.</div>
					</div>
				</div>
			</Window>
		)
	}

	removeItem() {
		const {
			menu,
			menuRemovePost,
			menuRemoveComment
		} = this.props;

		menu.itemType === 'post' ? menuRemovePost(menu.postId) : menuRemoveComment(menu.postId, menu.itemId, menu.key);
	}
}

MenuRemove.propTypes = {
	menuRemoveClose: PropTypes.func.isRequired,
	menuRemoveComment: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	menu: state.menu,
})

const mapDispatchToProps = (dispatch) => ({
	menuRemoveClose: () => dispatch(menuRemoveClose()),
	menuRemovePost: (postId) => dispatch(menuRemovePost(postId)),
	menuRemoveComment: (postId, itemId, key) => dispatch(menuRemoveComment(postId, itemId, key)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuRemove);
