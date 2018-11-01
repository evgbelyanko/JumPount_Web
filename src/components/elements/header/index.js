import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './index.css'

class Header extends React.Component {

	render() {
		const setActiveClassName = 'navigation_active';
		const activePage = this.props.page.active;

		return (
			<ul className="navigation">
				<li>
					<img src="/logo_35.png" className="navigation_logo" alt="" />
				</li>
				<li>
					<Link to="/feed" className={activePage === 'feed' ? setActiveClassName : null}>
						<span className="fa fa-list navigation_icon" />
						<span className="navigation_text">Новости</span>
					</Link>
				</li>
				<li>
					<Link to="/map" className={activePage === 'map' ? setActiveClassName : null}>
						<span className="fa fa-globe navigation_icon" />
						<span className="navigation_text">Карта</span>
					</Link>
				</li>
	{/*			<li>
					<Link to="/camera" className="navigation_camera">
						<span className="fa fa-camera-retro navigation_icon" />
						<span className="navigation_text">Камера</span>
					</Link>
				</li>*/}
				<li>
					<Link to="/search" className={activePage === 'search' ? setActiveClassName : null}>
						<span className="fa fa-search navigation_icon" />
						<span className="navigation_text">Поиск</span>
					</Link>
				</li>
				<li>
					<Link to="/profile" className={activePage === 'profile' ? setActiveClassName : null}>
						<span className="fa fa-user navigation_icon" />
						<span className="navigation_text">Профиль</span>
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