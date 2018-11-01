import React from 'react'

import './index.css'

class PostInfo extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			bottom: {
				main: { height: 40 },
				arrowUp: { visibility: 'visible' },
				arrowDown: { visibility: 'hidden' },
				editSwitch: { visibility: 'hidden' },
				editStatus: { visibility: 'hidden' },
				checkSwitch: { visibility: 'hidden'}
			}
		}
	}

	render() {
		const {
			main,
			arrowUp,
			arrowDown,
			editSwitch,
			editStatus,
			checkSwitch
		} = this.state.bottom;

		const {
			title,
			desc
		} = this.props

		return (
			<div className="pv_picture_bottom" style={main}>
				<div className="fa fa-arrow-circle-up pv_icon_up" style={arrowUp} onClick={() => this.showBottom()} />
				<div className="fa fa-arrow-circle-down pv_icon_down" style={arrowDown} onClick={() => this.hideBottom()} />
				<div className="fa fa-pencil pv_icon_edit" style={editSwitch} onClick={() => this.editBottom()} />
				<div className="fa fa-check pv_icon_check" style={checkSwitch} onClick={() => this.checkBottom()} />
				<div className="pv_picture_bottom_title">{title}</div>
				<div className="pv_picture_bottom_desc" style={arrowDown}>{desc}</div>
				<form className="pv_desc_form" style={editStatus}>
					<input id="pv_desc_form_picture_name" type="text" placeholder="Название фотографии..." maxLength="40" />
					<textarea id="pv_desc_form_picture_desc" type="text" placeholder="Описание фотографии..." maxLength="250" />
				</form>
			</div>
		);
	}

	showBottom(){
		this.setState({
			bottom: {
				main: { height: 150 },
				arrowUp: { visibility: 'hidden' },
				arrowDown: { visibility: 'visible' },
				editSwitch: { visibility: 'visible' }
			}
		});
	}

	hideBottom(){
		this.setState({
			bottom: {
				main: { height: 40 },
				arrowUp: { visibility: 'visible' },
				arrowDown: { visibility: 'hidden' },
				editSwitch: { visibility: 'hidden' }
			}
		});
	}

	editBottom() {
		this.setState({
			bottom: {
				main: { height: 150 },
				arrowUp: { visibility: 'hidden' },
				arrowDown: { visibility: 'hidden' },
				editSwitch: { visibility: 'hidden' },
				editStatus: { visibility: 'visible' },
				checkSwitch: { visibility: 'visible' }
			}
		});
	}

	checkBottom() {
		this.showBottom();
	}

}

export default PostInfo;
