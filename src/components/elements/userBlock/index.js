import React from 'react';
import { Link } from 'react-router-dom';

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
			timeDesc,
			userName,
			ellipsis,
			userDesc,
			userAvatar,
		} = this.props;

		const blockDesc = timeDesc ? this.showTime(timeDesc) : userDesc;
		const classBlockDesc = timeDesc ? 'user_desc_datetime' : null;

		return (
			<div className="user_block">
				<div className="user_link">
					<Link to={`/user/${userId}`} className="user_img">
						<img src={userAvatar} alt=""/>
					</Link>
					<div className="user_info">
						<div className="user_nickname">
							<span>{userName}</span>
						</div>
						<div className="user_desc">
							<span className={classBlockDesc}>{blockDesc}</span>
						</div>
					</div>
				</div>
				{ellipsis ? this.ellipsis() : null}
			</div>
		);
	}

	showTime(timeDesc) {
		const monthsArr = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

		const time = Date.parse(timeDesc);
		const dateObj = new Date(time);

		let year = dateObj.getFullYear();
		let month = dateObj.getMonth();
		let numDay = dateObj.getDate();
		//let day = dateObj.getDay();
		let hour = dateObj.getHours();
		let minute = dateObj.getMinutes();

		if (minute < 10) minute = '0' + minute;

		const out = `${numDay} ${monthsArr[month]} ${year}, ${hour}:${minute}`;

		return out;
	}

}
