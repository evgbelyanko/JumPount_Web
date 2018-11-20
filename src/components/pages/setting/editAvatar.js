import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
	sendUpdateAvatar,
	sendDeleteAvatar,
} from '../../../actions/setting'

import './index.css'

class EditAvatar extends React.Component {

	render() {
		const { avatar_150 } = this.props.pageData.setting;

		return (
			<div className="setting_form_avatar">
				<img src={avatar_150} className="setting_avatar" alt=""/>
				<div className="setting_avatar_buttons">
					<button 
					className="btn_black setting_form_avatar_upload" 
					style={{height: 30, width: 150}} 
					type="submit" 
					>Загрузить</button>
					<input 
					className="setting_form_avatar_upload_input" 
					style={{height: 30, width: 150}} 
					type="file" 
					name="file" 
					onChange={e => e.target.files[0] ? this.props.sendUpdateAvatar(e.target.files[0]) : null}
					accept="image/jpeg,image/png,image/gif"/>
					<button 
					className="btn_black setting_form_avatar_delete" 
					style={{height: 30, width: 150}} 
					type="submit"
					onClick={() => this.props.sendDeleteAvatar()}>Удалить</button>
				</div>
			</div>
		)
	}
}

EditAvatar.propTypes = {
	pageData: PropTypes.object.isRequired,
	sendDeleteAvatar: PropTypes.func.isRequired,
	sendUpdateAvatar: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	pageData: state.pageData,
})

const mapDispatchToProps = (dispatch) => ({
	sendDeleteAvatar: () => dispatch(sendDeleteAvatar()),
	sendUpdateAvatar: (data) => dispatch(sendUpdateAvatar(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditAvatar);
