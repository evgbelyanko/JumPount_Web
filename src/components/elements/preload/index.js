import React from 'react';

import './index.css';

export default class preload extends React.Component {

	render() {
		return ( 
			<div className="preload_back_page">
				<div className="fa fa-refresh preload_spin" style={this.props.color ? {color: this.props.color} : null}/>
			</div>
		);
	}
}