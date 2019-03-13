import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserInputForm from './UserInputForm';
import AutoComplete from '../AutoComplete/AutoComplete';

configure({ adapter: new Adapter() });

describe('<UserInputForm />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<UserInputForm />);
  });

  it('should render two autocompletes', () => {
    expect(wrapper.find(AutoComplete)).toHaveLength(2);
  });
});
