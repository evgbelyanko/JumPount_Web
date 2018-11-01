import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './index.css'
import { setActivePage } from '../../../actions/camera'

class Camera extends React.Component {

	componentDidMount() {
		this.props.setActivePage();
	}

	render() {
	    return (
			<div className="content">
				<div className="camera error">
					<div className="fa fa-camera camera_icon" />
					<div className="camera_text">Поделиться фото</div>
					<div className="camera_btn btn_black">Скачать приложение</div>
				</div>
			</div>
	    );
	}
}

Camera.propTypes = {
	page: PropTypes.object.isRequired,
	setActivePage: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	page: state.page,
})

const mapDispatchToProps = (dispatch) => ({
	setActivePage: () => dispatch(setActivePage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Camera);