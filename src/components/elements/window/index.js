import React from 'react'

import './index.css'

export default class Window extends React.Component {

	render() {
		const {
			width,
			enable,
			zIndex,
			onClose,
			children,
		} = this.props;
		const varZIndex = zIndex ? zIndex : 800;

		if(!enable) return children;

		return (
			<div className="wrap">
				<div className="wrap_back" style={{zIndex: varZIndex}} onClick={() => onClose()}>
					<div className="fa fa-close wrap_close" />
				</div>
				<div className="wrap_window" style={{width: width, zIndex: varZIndex+10}}>
					{children}
				</div>
			</div>
		);
	}

}
