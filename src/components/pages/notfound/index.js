import React from 'react'

import './index.css'

class NotFound extends React.Component {

	render() {
	    return (
			<div className="error_back">
				<div className="error_block">
					<span className="fa fa-window-close-o error_icon"></span>
					<div className="error_text">Страница не найдена</div>
					<button className="btn_white" onClick={() => this.props.history.push('/')}>
						<span className="fa fa-reply"></span>
						<span className="error_btn_text">Вернуться</span>
					</button>
				</div>
			</div>
	    )
	}
}

export default NotFound;