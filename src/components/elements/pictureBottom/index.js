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
			<div className="pictureBottom" style={main}>
				<div className="fa fa-arrow-circle-up pictureBottom_icon_up" style={arrowUp} onClick={() => this.showBottom()} />
				<div className="fa fa-arrow-circle-down pictureBottom_icon_down" style={arrowDown} onClick={() => this.hideBottom()} />
				<div className="fa fa-pencil pictureBottom_icon_edit" style={editSwitch} onClick={() => this.editBottom()} />
				<div className="fa fa-check pictureBottom_icon_check" style={checkSwitch} onClick={() => this.checkBottom()} />
				<div className="pictureBottom_title">{title}</div>
				<div className="pictureBottom_desc" style={arrowDown}>{desc}</div>
				<form className="pictureBottom_form" style={editStatus}>
					<input type="text" placeholder="Название фотографии..." maxLength="40" />
					<textarea type="text" placeholder="Описание фотографии..." maxLength="250" />
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
