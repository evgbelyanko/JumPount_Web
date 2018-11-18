import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
	menuOpen,
	followsOpen,
} from '../../../actions/profile'

class ProfileInfo extends React.Component {

	render() {
		const {
			user_id,
			user_desc,
			user_name,
			avatar_150,
			count_posts,
			user_website,
			country_name,
			user_followers,
			user_following,
		} = this.props.pageData.profile.profileInfo;

		const { menuOpen } = this.props;

		return (
			<div className="profile_info">
				<img src={avatar_150} className="profile_info_avatar picture_shadow" alt="" />
				<div className="profile_info_data">
					<div className="profile_info_data_name">{user_name}</div>
					{country_name ? this.blockCountry(country_name) : null}
					{user_website ? this.blockWebsite(user_website) : null}
					<div className="fa fa-ellipsis-h user_action_post" style={{fontSize: 24}} 
					onClick={() => menuOpen({
						userId: user_id,
						userName: user_name
					})}></div>
				</div>
				<div className="profile_info_custom">
					<button>
						<div>Публикации:</div>
						<span className="fa fa-photo"></span>
						<span style={{fontWeight: 'bold'}}> {count_posts}</span>
					</button>
					<button style={{cursor: 'pointer'}} onClick={() => this.followsCreate('followers', user_id)}>
						<div>Подписчики:</div>
						<span className="fa fa-users"></span>
						<span style={{fontWeight: 'bold'}}> {user_followers}</span>
					</button>
					<button style={{cursor: 'pointer'}} onClick={() => this.followsCreate('following', user_id)}>
						<div>Подписки:</div>
						<span className="fa fa-users"></span>
						<span style={{fontWeight: 'bold'}}> {user_following}</span>
					</button>
				</div>
				{user_desc ? this.blockDesc(user_desc) : null}
			</div>
		);
	}
  
	blockCountry(country_name) {
		return (
			<div className="profile_info_data_home">
				<span className="fa fa-home" />
				<span> {country_name}</span>
			</div>
		)
	}

	blockWebsite(user_website) {
		return (
			<a href={user_website} target="_blank" rel="noopener noreferrer" className="profile_info_data_website">
				<span className="fa fa-internet-explorer" />
				<span> {user_website}</span>
			</a>
		)
	}

	blockDesc(user_desc) {
		return (
			<div className="profile_info_desc">
				<span className="fa fa-address-card-o" />
				<span> {user_desc}</span>
			</div>
		)
	}

	followsCreate(page, userId) {
		const {
			history,
			followsOpen
		} = this.props;
		const { device } = this.props.pageConf;

		device === 'desktop' ? followsOpen(page, userId) : history.push(`/${page}/${userId}`);
	}

}

ProfileInfo.propTypes = {
	menuOpen: PropTypes.func.isRequired,
	pageConf: PropTypes.object.isRequired,
	pageData: PropTypes.object.isRequired,
	followsOpen: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	pageConf: state.pageConf,
	pageData: state.pageData,
})

const mapDispatchToProps = (dispatch) => ({
	menuOpen: (data) => dispatch(menuOpen(data)),
	followsOpen: (page, userId) => dispatch(followsOpen(page, userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo);
