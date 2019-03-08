import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserInputForm from './components/UserInputForm/UserInputForm';
import MapRenderer from './components/MapRenderer/MapRender';
import { connect } from 'react-redux';
import { fetchToken } from './actions';

class App extends Component {
  static defaultProps = {
    center: {
      lat: 22.372081,
      lng: 114.107877
    },
    zoom: 7
  };

  constructor(props) {
    super(props);
    this.state = {
      origin: [],
      destination: [],
      isFormValid: true
    };
  }

  originChangedHandler = (lat, lng) => {
    this.setState({
      origin: [lat, lng]
    });
  };

  destinationChangedHandler = (lat, lng) => {
    this.setState({
      destination: [lat, lng]
    });
  };

  submitHandler = () => {
    let { origin, destination } = this.state;
    if (!origin.length || !destination.length) {
      this.setState({
        isFormValid: false
      });
      return;
    }
    this.setState({
      isFormValid: true,
      isLoading: true
    });
    this.props.onGetDetails(this.state.origin, this.state.destination);
  };

  render() {
    return (
      <div>
        {this.props.response.isLoading && <div className='loading' />}
        <div className='container py-5'>
          <div className='row'>
            <div className='col-12 col-md-3'>
              <UserInputForm
                isFormValid={this.state.isFormValid}
                onSubmit={this.submitHandler}
                error={this.props.response.error}
                errorMsg={this.props.response.errorMsg}
                totalTime={this.props.response.total_time}
                totalDistance={this.props.response.total_distance}
                onOriginChng={this.originChangedHandler}
                onDestinationChng={this.destinationChangedHandler}
              />
            </div>
            <div className='col-12 col-md-9'>
              <MapRenderer
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
                route={this.props.response.path}
                origin={this.state.origin}
                destination={this.state.destination}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    response: state.resp
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetDetails: (origin, destination) =>
      dispatch(fetchToken(origin, destination))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
