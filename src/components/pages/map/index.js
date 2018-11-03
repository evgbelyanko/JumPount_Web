import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer"
import { logout } from '../../../actions/auth/logout'
import { setActivePage } from '../../../actions/map'

import './index.css'

import Panel from './panel'
import PhotoView from '../photoview'

const MapWithAMarkerClusterer = compose(
	withProps({
		googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAeSOHuULn3P2EafsXS4t5163z5ouAML9Y&v=3.exp&libraries=geometry,drawing,places",
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div className="map" />,
		mapElement: <div style={{ height: `100%` }} />,
	}),
	withStateHandlers(() => ({
		visiblePanel: false,
		postPhotoViewId: null,
		markersIds: []
	}), {
		openPanel: ({ visiblePanel,recreate }) => (markerClusterer) => ({
			visiblePanel: true,
			markersIds: markerClusterer.getMarkers().map(marker => (marker.title.toString()))
		}),
		closePanel: ({ visiblePanel }) => () => ({
			visiblePanel: false
		}),
		openPhotoView: ({ postPhotoViewId }) => (postPhotoViewId) => ({
			postPhotoViewId: postPhotoViewId
		}),
		closePhotoView: ({ postPhotoViewId }) => () => ({
			postPhotoViewId: null
		}),
	}),
	withScriptjs,
	withGoogleMap
)(props =>
	<GoogleMap
	defaultZoom={2}
	defaultCenter={{ lat: 50, lng: 50 }}
	defaultOptions= {{
		minZoom: 3,
		maxZoom: 18
	}}
	onCenterChanged={props.closePanel} >
	
		<MarkerClusterer
		onClick={props.openPanel}
		averageCenter
		enableRetinaIcons
		gridSize={50}
		defaultZoomOnClick={false}
		zoomOnClick={false} >

			{props.markers.map(marker => (
				<Marker
				key={marker.photo_id}
				title={marker.photo_id.toString()}
				position={{ lat: marker.photo_latitude, lng: marker.photo_longitude }}
				onClick={() => console.log(marker.photo_id)} />
			))}
		</MarkerClusterer>

		{props.postPhotoViewId ? (
				<PhotoView 
				onClose={props.closePhotoView} 
				postPhotoViewId={props.postPhotoViewId} /> 
			) : null }

		{props.visiblePanel ? (
				<Panel 
				markersIds={props.markersIds} 
				visible={props.visiblePanel} 
				closePanel={props.closePanel}
				openPhotoView={props.openPhotoView} /> 
			) : null }

	</GoogleMap>
);

class Gmap extends React.PureComponent {

	constructor() {
		super();

		this.state = {
			isLoaded: false,
			markers: []
		};
	}

	componentDidMount() {
		fetch(`/map/clusters`, {
			credentials: 'include'
		})
		.then(res => res.json())
		.then(data => {
			if(data.error === 401) {
				this.props.logout();
				return false;
			}
			this.setState({
				isLoaded: true,
				markers: data.listMarkers
			});
		})

		this.props.setActivePage();
	}

	render() {
		if(!this.state.isLoaded) return <img src="/img/preload.gif" className="preload_page" alt=""/>;
		
		const { markers } = this.state;

		return (
			<div>
				<MapWithAMarkerClusterer markers={markers}/>
				<Link to="/camera" className="page_camera">
					<span className="fa fa-camera" />
				</Link>
			</div>
		)
	}

}

Gmap.propTypes = {
	page: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired,
	setActivePage: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	page: state.page,
})

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logout()),
	setActivePage: () => dispatch(setActivePage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Gmap);