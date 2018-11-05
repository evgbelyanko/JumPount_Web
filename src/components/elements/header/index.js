import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './index.css'

class Header extends React.Component {

	render() {
		const {
			name,
			device
		} = this.props.page;
		const setActiveClassName = 'navigation_active';

		return (
			<ul className="navigation">
				<li>
					<img src="/img/logo_35.png" className="navigation_logo" alt="" />
				</li>
				<li>
					<Link to="/feed" className={name === 'feed' ? setActiveClassName : null}>
						<span className="fa fa-list navigation_icon" />
						{ device === 'desktop' ? <span className="navigation_text">Новости</span> : null }
					</Link>
				</li>
				<li>
					<Link to="/map" className={name === 'map' ? setActiveClassName : null}>
						<span className="fa fa-globe navigation_icon" />
						{ device === 'desktop' ? <span className="navigation_text">Карта</span> : null }
					</Link>
				</li>
	{/*			<li>
					<Link to="/camera" className={name === 'camera' ? setActiveClassName : null}>
						<span className="fa fa-camera-retro navigation_icon" />
						{ device === 'desktop' ? <span className="navigation_text">Камера</span> : null }
					</Link>
				</li>*/}
				<li>
					<Link to="/search" className={name === 'search' ? setActiveClassName : null}>
						<span className="fa fa-search navigation_icon" />
						{ device === 'desktop' ? <span className="navigation_text">Поиск</span> : null }
					</Link>
				</li>
				<li>
					<Link to={`/user/${localStorage.userId}`} className={name === 'profile' ? setActiveClassName : null}>
						<span className="fa fa-user navigation_icon" />
						{ device === 'desktop' ? <span className="navigation_text">Профиль</span> : null }
					</Link>
				</li>
			</ul>
		)
	}
}

Header.propTypes = {
	page: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	page: state.page,
})


export default connect(mapStateToProps)(Header);