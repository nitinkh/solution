/*global google*/
import React from 'react';
const { compose, withProps, lifecycle } = require('recompose');
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} = require('react-google-maps');

const MapRenderer = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_GOOGLE_MAP_KEY
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      this.props.mapLoaded();
    },
    componentWillReceiveProps(nextProps) {
      if (nextProps.route.length < 1) {
        return;
      }
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: new google.maps.LatLng(
            nextProps.route[0][0],
            nextProps.route[0][1]
          ),
          destination: new google.maps.LatLng(
            nextProps.route[1][0],
            nextProps.route[1][1]
          ),
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: [
            {
              location: new google.maps.LatLng(
                nextProps.route[2][0],
                nextProps.route[2][1]
              )
            }
          ]
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          }
        }
      );
    }
  })
)(props => (
  <GoogleMap
    defaultZoom={props.defaultZoom}
    defaultCenter={
      new google.maps.LatLng(props.defaultCenter.lat, props.defaultCenter.lng)
    }
  >
    {props.route.length > 0 && (
      <DirectionsRenderer directions={props.directions} />
    )}
  </GoogleMap>
));

export default MapRenderer;
