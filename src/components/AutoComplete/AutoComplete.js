/*global google*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AutoComplete.css';

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.autoInput = React.createRef();
    this.autocomplete = null;
    this.inputChanged = this.inputChanged.bind(this);
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.autoInput.current,
      { types: ['geocode'] }
    );
    this.autocomplete.addListener('place_changed', this.inputChanged);
  }

  inputChanged() {
    const location = this.autocomplete.getPlace().geometry.location;
    this.props.onPlaceChanged(location.lat(), location.lng());
  }

  render() {
    return (
      <input
        ref={this.autoInput}
        type='search'
        className='form-control'
        placeholder={this.props.placeholderText}
        id={this.props.id}
      />
    );
  }
}

AutoComplete.propTypes = {
  id: PropTypes.string,
  onPlaceChanged: PropTypes.func,
  placeholderText: PropTypes.string
};

export default AutoComplete;
