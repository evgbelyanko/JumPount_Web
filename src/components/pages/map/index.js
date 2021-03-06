import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer"

import { getPageData } from '../../../actions/map'

import Panel from './panel'
import PhotoView from '../photoview'
import Preload from '../../elements/preload'

import './index.css'

const MapWithAMarkerClusterer = compose(
	withProps({
		googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAeSOHuULn3P2EafsXS4t5163z5ouAML9Y&v=3.exp&libraries=geometry,drawing,places",
		loadingElement: <div />,
		containerElement: <div id="map" />,
		mapElement: <div style={{ height: `100vh` }} />,
	}),
	withStateHandlers(() => ({
		visiblePanel: false,
		postPhotoViewId: null,
		markersIds: []
	}), {
		openPanelClusterer: ({ visiblePanel }) => (markerClusterer) => ({
			visiblePanel: true,
			markersIds: markerClusterer.getMarkers().map(marker => (+marker.title))
		}),
		openPanelMarker: ({ visiblePanel }) => (marker) => ({
			visiblePanel: true,
			markersIds: [marker]
		}),
		closePanel: ({ visiblePanel }) => () => ({
			visiblePanel: false
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
		onClick={props.openPanelClusterer}
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
				onClick={() => props.openPanelMarker(marker.photo_id)} />
			))}
		</MarkerClusterer>
		{props.children}
		{props.visiblePanel ? 
			<Panel
			history={props.history}
			markersIds={props.markersIds} /> : null }

	</GoogleMap>
);

class Gmap extends React.PureComponent {
	
	componentDidMount() { this.props.getPageData(); }

	render() {
		if(!this.props.pageData.listMarkers) return <Preload />;

		const {
			history,
			pageData,
			photoView
		} = this.props;

		return (
			<div>
				<MapWithAMarkerClusterer 
				history={history}
				markers={pageData.listMarkers}>
					<div className="map_logo" />
					<div id="camera_launch" className="map_page_camera" onClick={() => this.onLoadCamera()}>
						<span className="fa fa-camera" />
					</div>
				</MapWithAMarkerClusterer>
				{photoView.isLoaded ? <PhotoView /> : null}
			</div>
		)
	}

	onLoadCamera() {
		if(localStorage.device === 'mobile' && localStorage.deviceOS === 'android'){
			window.launchCamera();
		} else {
			this.props.history.push('/camera');
		}
	}
}

Gmap.propTypes = {
	pageData: PropTypes.object.isRequired,
	getPageData: PropTypes.func.isRequired,
	photoView: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	pageData: state.pageData,
	photoView: state.photoView,
})

const mapDispatchToProps = (dispatch) => ({
	getPageData: () => dispatch(getPageData()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Gmap);