import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sendUpdateAvatar } from '../../../actions/setting'

import './index.css'

class EditAvatar extends React.Component {

	constructor(props) {
		super(props)

		const { avatar_150 } = props.pageData.setting;

		this.state = {
			avatar150: avatar_150,
		}
	}

	render() {
		const { avatar150 } = this.state;

		return (
			<div className="setting_form_avatar">
				<img src={avatar150} className="setting_avatar" alt=""/>
				<div className="setting_avatar_buttons">
					<button 
					className="btn_black setting_form_avatar_upload" 
					style={{height: 30, width: 150}} 
					type="submit" 
					//onClick={() => this.handleUploadAvatar()}
					>Загрузить</button>
					<input 
					className="setting_form_avatar_upload_input" 
					style={{height: 30, width: 150}} 
					type="file" 
					name="file" 
					onChange={e => this.handleUploadAvatar(e)}
					accept="image/jpeg,image/png,image/gif"/>
					<button 
					className="btn_black setting_form_avatar_delete" 
					style={{height: 30, width: 150}} 
					type="submit"
					onClick={() => this.handleDeleteAvatar()}>Удалить</button>
				</div>
			</div>
		)
	}

	handleUploadAvatar(e) {

		this.props.sendUpdateAvatar(e.target.files[0])
	}

	handleDeleteAvatar() {
		this.setState({
			avatar150: null
		})
	}
}

EditAvatar.propTypes = {
	pageData: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	pageData: state.pageData,
})

const mapDispatchToProps = (dispatch) => ({
	sendUpdateAvatar: (data) => dispatch(sendUpdateAvatar(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditAvatar);
