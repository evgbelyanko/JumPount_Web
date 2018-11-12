import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { setPageConf } from '../../../actions/camera'

import './index.css'

class Camera extends React.Component {

	componentDidMount() { this.props.setPageConf(); }

	render() {
	    return (
			<div className="content">
				<div className="camera">
					<div className="fa fa-camera camera_icon" />
					<div className="camera_text">Поделиться фото</div>
					<button className="camera_btn btn_black" style={{height: 30, width: 170}}>Скачать приложение</button>
				</div>
			</div>
	    );
	}
}

Camera.propTypes = {
	setPageConf: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
	setPageConf: () => dispatch(setPageConf()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Camera);