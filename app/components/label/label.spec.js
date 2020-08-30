import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Label from './label';

configure({ adapter: new Adapter() });

describe('Label', () => {
  it('should render when valid forVal and text props are received', () => {
    const component = shallow(<Label forVal="Test" text="Test" />);
    expect(component).toMatchSnapshot();
  });
});
