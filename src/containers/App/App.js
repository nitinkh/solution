import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserInputForm from '../../components/UserInputForm/UserInputForm';
import MapRenderer from '../../components/MapRenderer/MapRender';
import { connect } from 'react-redux';
import { fetchToken, reset } from '../../actions';

class App extends Component {
  static defaultProps = {
    center: {
      lat: 22.372081,
      lng: 114.107877
    },
    zoom: 7
  };

  constructor(props) {
    super();
    this.state = {
      isFormValid: true,
      isMapLoaded: false
    };
  }

  mapLoadedHandler = () => {
    if (!this.state.isMapLoaded) {
      this.setState({
        isMapLoaded: true
      });
    }
  };

  resetClicked = () => {
    this.props.reset();
  };

  submitHandler = (origin, destination) => {
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
    this.props.onGetDetails(origin, destination);
  };

  render() {
    return (
      <div>
        {this.props.response.isLoading && <div className='loading' />}
        <div className='container py-5'>
          <div className='row'>
            <div className='col-12 col-md-3'>
              {this.state.isMapLoaded && (
                <UserInputForm
                  isFormValid={this.state.isFormValid}
                  onSubmit={this.submitHandler}
                  error={this.props.response.error}
                  errorMsg={this.props.response.errorMsg}
                  totalTime={this.props.response.totalTime}
                  totalDistance={this.props.response.totalDistance}
                  resetClicked={this.resetClicked}
                />
              )}
            </div>
            <div className='col-12 col-md-9'>
              <MapRenderer
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
                route={this.props.response.path}
                mapLoaded={this.mapLoadedHandler}
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
      dispatch(fetchToken(origin, destination)),
    reset: () => dispatch(reset())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
