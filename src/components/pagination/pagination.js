import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';
import { colours, padding } from '../../utils/theme';

// Styles
const Pagination = styled.nav`
  color: ${colours.deepPurple};
  display: flex;
  flex-direction: row;
  font-size: 1rem;
  justify-content: space-between;
  margin-top: ${padding}
  text-align: center;
`;

const Button = styled.button`
  padding: 0.5rem;
  font-size: 1rem;
`;

export default ({
  prevResults,
  nextResults,
  prevDisabled,
  nextDisabled,
  currentPage,
  numPages,
}) => {
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
      <span>
        {currentPage}
        of&nbsp;
        {numPages}
        &nbsp;pages
      </span>
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
