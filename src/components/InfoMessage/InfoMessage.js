import React from 'react';

const InfoMessage = props => {
  return (
    <div className='form-group'>
      {!props.isFormValid && (
        <span className='d-block text-danger'>
          Origin and Destination are required
        </span>
      )}
      {props.error && (
        <span className='d-block text-danger'>{props.errorMsg}</span>
      )}
      {props.totalDistance && (
        <span className='d-block text-success'>
          Total Distance: <span>{props.totalDistance}</span>
        </span>
      )}
      {props.totalTime && (
        <span className='d-block text-success'>
          Total Time: <span>{props.totalTime}</span>
        </span>
      )}
    </div>
  );
};

export default InfoMessage;
