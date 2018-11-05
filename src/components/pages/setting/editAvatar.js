import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css'

class EditAvatar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		const { avatar_150 } = this.props.settingInfo;

		return (
			<div className="setting_form_avatar">
				<img src={avatar_150} id="setting_avatar" alt=""/>
				<div className="setting_avatar_buttons">
					<div id="upload_avatar" className="btn_black" type="submit">Загрузить</div>
					<input id="input_upload" type="file" name="file" accept="image/jpeg,image/png,image/gif"/>
					<div id="remove_avatar" className="btn_black" type="submit">Удалить</div>
				</div>
			</div>
		);
	}
}

EditAvatar.propTypes = {
	page: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	page: state.page,
})

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(EditAvatar);
