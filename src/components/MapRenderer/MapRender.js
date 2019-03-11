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
      let origin = nextProps.origin;
      let destination = nextProps.destination;
      if (nextProps.route.length > 0) {
        origin = [22.317067, 114.158506];
        destination = [22.371921, 114.109142];
      }
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: new google.maps.LatLng(origin[0], origin[1]),
          destination: new google.maps.LatLng(destination[0], destination[1]),
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: nextProps.route.map(path => {
            return {
              location: new google.maps.LatLng(path[0], path[1])
            };
          })
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
    {<DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));

export default MapRenderer;
