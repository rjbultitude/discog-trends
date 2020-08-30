import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Filter from './filter';

configure({ adapter: new Adapter() });

describe('Filter setError', () => {
  let filterWrapper;
  const setPagination = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setPagination]);

  beforeEach(() => {
    filterWrapper = Enzyme.shallow(<Filter />);
  });

  it.skip('should decrement current page', () => {
    filterWrapper.dive().instance().prevResults();
    expect(setPagination).toHaveBeenCalledWith({ pages: -1 });
  });
});
