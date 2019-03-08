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
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDurZQBXjtSzKeieXwtFeGe-jhZu-HEGQU&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentWillReceiveProps(nextProps) {
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: new google.maps.LatLng(
            nextProps.origin[0],
            nextProps.origin[1]
          ),
          destination: new google.maps.LatLng(
            nextProps.destination[0],
            nextProps.destination[1]
          ),
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
          } else {
            console.error(`error fetching directions ${result}`);
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
