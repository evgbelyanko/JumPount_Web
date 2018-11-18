import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { changeTextBox } from '../../../actions/pictureBottom'

import './index.css'

class PictureBottom extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			postId: props.postId,
			userId: props.userId,
			inputValue: props.title,
			textareaValue: props.desc,
			bottom: {
				main: { height: 40 },
				formBox: { display: 'none' },
				arrowUp: { display: 'block' },
				arrowDown: { display: 'none' },
				editSwitch: { display: 'none' },
				checkSwitch: { display: 'none'},
				textBox_desc: { display: 'none'},
				textBox_title: { display: 'block'},
			}
		};
	}

	render() {
		const {
			inputValue,
			textareaValue,
		} = this.state;

		const {
			main,
			formBox,
			arrowUp,
			arrowDown,
			editSwitch,
			checkSwitch,
			textBox_desc,
			textBox_title,
		} = this.state.bottom;

		return (
			<div className="pictureBottom" style={main}>
				<div className="fa fa-arrow-circle-up pictureBottom_icon_up" style={arrowUp} onClick={() => this.showBottom()} />
				<div className="fa fa-arrow-circle-down pictureBottom_icon_down" style={arrowDown} onClick={() => this.hideBottom()} />
				<div className="fa fa-pencil pictureBottom_icon_edit" style={editSwitch} onClick={() => this.editBottom()} />
				<div className="fa fa-check pictureBottom_icon_check" style={checkSwitch} onClick={() => this.checkBottom()} />
				<div className="pictureBottom_title" style={textBox_title}>{inputValue}</div>
				<div className="pictureBottom_desc" style={textBox_desc}>{textareaValue}</div>
				<form className="pictureBottom_form" style={formBox}>
					<input 
					type="text"
					maxLength="50"
					defaultValue={inputValue}
					placeholder="Название фотографии..."
					onChange={evt => this.updateInputValue(evt)} />
					<textarea
					type="text"
					maxLength="250"
					defaultValue={textareaValue}
					placeholder="Описание фотографии..."
					onChange={evt => this.updateTextareaValue(evt)} />
				</form>
			</div>
		);
	}

	sendTextBox() {
		const {
			postId,
			inputValue,
			textareaValue
		} = this.state;

		this.props.changeTextBox({
			postId: postId,
			postTitle: inputValue,
			postDesc: textareaValue
		});
	}

	updateInputValue(evt) {
		const inputValue = evt.target.value;
		this.setState({ inputValue: inputValue });
	}

	updateTextareaValue(evt) {
		const textareaValue = evt.target.value;
		this.setState({ textareaValue: textareaValue });
	}

	showBottom(){
		this.setState({
			bottom: {
				main: { height: 150 },
				formBox: { display: 'none' },
				arrowUp: { display: 'none' },
				arrowDown: { display: 'block' },
				checkSwitch: { display: 'none' },
				editSwitch: { display: +localStorage.userId === +this.state.userId ? 'block' : 'none'},
				textBox_desc: { display: 'block' },
				textBox_title: { 
					display: 'block',
					fontWeight: 'bold'
				},
			}
		});
	}

	hideBottom(){
		this.setState({
			bottom: {
				main: { height: 40 },
				formBox: { display: 'none' },
				arrowUp: { display: 'block' },
				arrowDown: { display: 'none' },
				editSwitch: { display: 'none' },
				checkSwitch: { display: 'none' },
				textBox_desc: { display: 'none' },
				textBox_title: { display: 'block' },
			}
		});
	}

	editBottom() {
		this.setState({
			bottom: {
				main: { height: 150 },
				arrowUp: { display: 'none' },
				formBox: { display: 'block' },
				arrowDown: { display: 'none' },
				editSwitch: { display: 'none' },
				checkSwitch: { display: 'block' },
				textBox_desc: { display: 'none' },
				textBox_title: { display: 'none' },
			}
		});
	}

	checkBottom() {
		this.showBottom();
		this.sendTextBox();
	}

}

PictureBottom.propTypes = {
	changeTextBox: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	
})

const mapDispatchToProps = (dispatch) => ({
	changeTextBox: (objPostBottom) => dispatch(changeTextBox(objPostBottom)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PictureBottom);