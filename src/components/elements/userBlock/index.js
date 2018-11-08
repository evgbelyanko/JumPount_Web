import React from 'react';
//import { Link } from 'react-router-dom';
import './index.css';

export default class UserBlock extends React.Component {

	constructor(){
		super();
		this.state = {
			redirect: false
		}
	}


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
			ellipsis,
			userDesc,
			userAvatar,
		} = this.props;

		return (
			<div className="user_block">
				<div className="user_link">
					<a href={`/user/${userId}`} className="user_img">
						<img src={userAvatar} alt=""/>
					</a>
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
