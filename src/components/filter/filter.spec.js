import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Filter, { buildQuery } from './filter';
import mockData from '../../utils/__mocks__/mock-data.json';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(JSON.parse(mockData)),
  })
);

configure({ adapter: new Adapter() });

describe('Filter setError', () => {
  const filterWrapper = shallow(<Filter />);
  const setPagination = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setPagination]);

  it.skip('should decrement current page', () => {
    filterWrapper.instance().prevResults();
    expect(setPagination).toHaveBeenCalledWith({ pages: -1 });
  });
});

describe('buildQuery', () => {
  it('should return "&genre=test" when genreVal is Test', () => {
    const genre = 'test';
    expect(buildQuery({ genre })).toEqual('&genre=test,');
  });
});
