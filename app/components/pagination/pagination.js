import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';
import { colours } from '../../utils/theme';

// Styles
const Pagination = styled.nav`
  color: ${colours.deepPurple};
  display: flex;
  flex-direction: row;
  font-size: 1rem;
  justify-content: space-between;
  text-align: center;
`;

const Button = styled.button`
  padding: 0.5rem;
  font-size: 1rem;
`;

export default props => {
  const { prevResults, nextResults, prevDisabled, nextDisabled } = props;
  return (
    <Pagination>
      <Button
        onClick={() => {
          prevResults();
        }}
        id="prev"
        type="button"
        disabled={prevDisabled}
      >
        Previous
      </Button>
      <Button
        onClick={() => {
          nextResults();
        }}
        id="next"
        type="button"
        disabled={nextDisabled}
      >
        Next
      </Button>
    </Pagination>
  );
};

Pagination.propTypes = {
  prevResults: PropTypes.instanceOf(Object),
  nextResults: PropTypes.instanceOf(Object),
};
