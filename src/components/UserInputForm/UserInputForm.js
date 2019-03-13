import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AutoComplete from '../AutoComplete/AutoComplete';
import './UserInputForm.css';

class UserInputForm extends Component {
  constructor(props) {
    super();
    this.state = {
      isSubmitClicked: false,
      isValid: true,
      origin: [],
      destination: []
    };
  }

  originLocChanged = (lat, lng) => {
    this.setState({
      origin: [lat, lng]
    });
  };

  destinationLocChanged = (lat, lng) => {
    this.setState({
      destination: [lat, lng]
    });
  };

  submitHandler = event => {
    event.preventDefault();
    this.setState({
      isSubmitClicked: true
    });
    this.props.onSubmit(this.state.origin, this.state.destination);
  };

  resetHandler = event => {
    event.preventDefault();
    this.origin.autoInput.current.value = '';
    this.destination.autoInput.current.value = '';
    this.setState({
      origin: [],
      destination: []
    });
    this.props.resetClicked();
  };

  render() {
    return (
      <form>
        <div className='form-group'>
          <label htmlFor='originLoc'>Starting location</label>
          <AutoComplete
            id='originLoc'
            onPlaceChanged={this.originLocChanged}
            placeholderText='Enter Origin Location'
            value={this.state.originValue}
            ref={node => {
              this.origin = node;
            }}
            resetClicked={this.resetHandler.bind(this)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='destinationLoc'>Destination location</label>
          <AutoComplete
            id='destinationLoc'
            onPlaceChanged={this.destinationLocChanged}
            placeholderText='Enter Destination Location'
            value={this.state.destinationValue}
            ref={node => {
              this.destination = node;
            }}
          />
        </div>

        <div className='form-group'>
          {!this.props.isFormValid && (
            <span className='d-block text-danger'>
              Origin and Destination are required
            </span>
          )}
          {this.props.error && (
            <span className='d-block text-danger'>{this.props.errorMsg}</span>
          )}
          {this.props.totalDistance && (
            <span className='d-block text-success'>
              Total Distance: <span>{this.props.totalDistance}</span>
            </span>
          )}
          {this.props.totalTime && (
            <span className='d-block text-success'>
              Total Time: <span>{this.props.totalTime}</span>
            </span>
          )}
        </div>

        <button className='btn button mb-5' onClick={this.submitHandler}>
          {!this.state.isSubmitClicked ? 'Submit' : 'Resubmit'}
        </button>
        <button className='btn button mb-5 marL' onClick={this.resetHandler}>
          Reset
        </button>
      </form>
    );
  }
}

UserInputForm.propTypes = {
  isFormValid: PropTypes.bool,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
  totalTime: PropTypes.number,
  totalDistance: PropTypes.number,
  onSubmit: PropTypes.func,
  onOriginChng: PropTypes.func,
  onDestinationChng: PropTypes.func
};

export default UserInputForm;
