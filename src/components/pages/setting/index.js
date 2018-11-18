import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getPageData } from '../../../actions/setting'

import EditInfo from './editInfo'
import EditAvatar from './editAvatar'
import Preload from '../../elements/preload'

import './index.css'

class Setting extends React.Component {

	componentDidMount() { this.props.getPageData(); }

	render() {
		if(!this.props.pageData.setting) return <Preload />;

		return (
			<div className="setting setting_form">
				<EditAvatar />
				<EditInfo />
			</div>
		)
	}
}

Setting.propTypes = {
	pageData: PropTypes.object.isRequired,
	getPageData: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	pageData: state.pageData,
})

const mapDispatchToProps = (dispatch) => ({
	getPageData: () => dispatch(getPageData()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
