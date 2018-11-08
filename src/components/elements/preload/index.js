import React from 'react';

import './index.css';

export default class preload extends React.Component {

	render() {
		return ( 
			<div style={{position: 'fixed', background: '#1d2127', height: '100vh', width: '100%'}}>
				<img src="/img/preload.gif" className="preload_page" alt=""/>
			</div>
		);
	}
}