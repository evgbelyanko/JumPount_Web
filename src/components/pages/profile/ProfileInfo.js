import React from 'react'
import Follows from '../follows'
import Menu from '../../elements/menu'

export default class ProfileInfo extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			pageFollows: null,
			menu: null,
		}
	}

	render() {
		const {
			user_desc,
			user_name,
			avatar_150,
			count_posts,
			user_website,
			country_name,
			user_followers,
			user_following,
		} = this.props.profileInfo;

		return (
			<div className="profile_info">
				<div className="profile_info_head">
					<img src={avatar_150} className="profile_info_head_avatar picture_shadow" alt="" />
					<div className="profile_info_head_addons">
						<div className="profile_info_head_line">
							<div className="profile_info_head_name">{user_name}</div>
							{country_name ? this.blockCountry(country_name) : null}
							{user_website ? this.blockWebsite(user_website) : null}
							<div className="fa fa-ellipsis-h user_action_post" style={{fontSize: 24}} onClick={() => this.openMenu()}></div>
							<div className="fa fa-refresh profile_refresh" style={{fontSize: 19}}></div>
						</div>
						<div className="profile_info_custom">
							<div id="publications" className="profile_info_custom_btn_publications">
								Публикации:
								<div className="profile_info_custom_btn_row">
									<span className="fa fa-photo"></span>
									<span className="profile_info_custom_btn_row_counter">{count_posts}</span>
								</div>
							</div>
							<div id="followers" className="profile_info_custom_btn" onClick={() => this.openFollows('followers')}>
								Подписчики:
								<div className="profile_info_custom_btn_row">
									<span className="fa fa-users"></span>
									<span className="profile_info_custom_btn_row_counter">{user_followers}</span>
								</div>
							</div>
							<div id="following" className="profile_info_custom_btn" onClick={() => this.openFollows('following')}>
								Подписки:
								<div className="profile_info_custom_btn_row">
									<span className="fa fa-users"></span>
									<span className="profile_info_custom_btn_row_counter">{user_following}</span>
								</div>
							</div>
						</div>
						{user_desc ? this.blockDesc(user_desc) : null}
					</div>
				</div>
				{this.state.pageFollows ? this.createFollows() : null}
				{this.state.menu ? this.createMenu() : null}
			</div>
		);
	}
  
	blockCountry(country_name) {
		return (
			<div className="profile_info_head_home">
				<span className="fa fa-home" />
				<span> {country_name}</span>
			</div>
		)
	}

	blockWebsite(user_website) {
		return (
			<a href={user_website} target="_blank" className="profile_info_head_website">
				<span className="fa fa-internet-explorer" />
				<span> {user_website}</span>
			</a>
		)
	}

	blockDesc(user_desc) {
		return (
			<div className="profile_desc">
				<span className="fa fa-address-card-o" />
				<span> {user_desc}</span>
			</div>
		)
	}
	createFollows() {
		return (
			<Follows
				onClose={() => this.closeFollows()}
				userId={this.props.profileInfo.user_id}
				pageFollows={this.state.pageFollows}
			/>
		);
	}
	openFollows(pageFollows) { this.setState({ pageFollows: pageFollows }) }
	closeFollows() { this.setState({ pageFollows: null }) }

	createMenu() {
		return (
			<Menu
				onClose={() => this.closeMenu()}
			/>
		);
	}
	openMenu() { this.setState({ menu: true }) }
	closeMenu() { this.setState({ menu: null }) }

}
