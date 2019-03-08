import React, { Component } from 'react';
import AutoComplete from '../AutoComplete/AutoComplete';
import './UserInputForm.css';

class UserInputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitClicked: false,
      isValid: true
    };
  }

  originLocChanged = (lat, lng) => {
    this.props.onOriginChng(lat, lng);
  };

  destinationLocChanged = (lat, lng) => {
    this.props.onDestinationChng(lat, lng);
  };

  submitHandler = event => {
    event.preventDefault();
    this.setState({
      isSubmitClicked: true
    });
    this.props.onSubmit();
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
          />
        </div>
        <div className='form-group'>
          <label htmlFor='destinationLoc'>Destination location</label>
          <AutoComplete
            id='destinationLoc'
            onPlaceChanged={this.destinationLocChanged}
            placeholderText='Enter Destination Location'
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
        <button className='btn button mb-5 marL'>Reset</button>
      </form>
    );
  }
}

export default UserInputForm;
