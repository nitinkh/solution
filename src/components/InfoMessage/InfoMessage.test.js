import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InfoMessage from './InfoMessage';

configure({ adapter: new Adapter() });

describe('<InfoMessage />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<InfoMessage />);
  });
  it('should render an error message if origin and destination are not there', () => {
    wrapper.setProps({ isFormValid: false });
    expect(
      wrapper.contains(
        <span className='d-block text-danger'>
          Origin and Destination are required
        </span>
      )
    ).toEqual(true);
  });

  it('should render error message if error is there', () => {
    wrapper.setProps({ error: true, errorMsg: 'Location is not accessible' });
    expect(
      wrapper.contains(
        <span className='d-block text-danger'>Location is not accessible</span>
      )
    ).toEqual(true);
  });
});
