import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default class UserBlock extends React.Component {

	ellipsis() {
		return (
			<div 
				className="user_action_post fa fa-ellipsis-h" 
				style={{fontSize: 24}}
				onClick={() => this.props.ellipsisOpen()}
			/>
		)
	}

	render() {
		const { 
			userId,
			userName,
			userAvatar,
			userDesc,
			ellipsis
		} = this.props;

		return (
			<div className="user_block">
				<div className="user_link">
					<Link to={{
							pathname: '/profile',
							search: '?userid='+userId,
						}} 
						className="user_img">
						<img src={userAvatar} alt=""/>
					</Link>
					<div className="user_info">
						<div className="user_nickname">
							<span>{userName}</span>
						</div>
						<div className="user_desc">
							<span>{userDesc}</span>
						</div>
					</div>
				</div>
				{ellipsis ? this.ellipsis() : null}
			</div>
		);
	}

}
