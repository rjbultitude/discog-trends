import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';
import { colours } from '../../utils/theme';

// Styles
const Pagination = styled.nav`
  display: flex;
  flex-direction: row;
  font-size: 1rem;
  text-align: center;
  color: ${colours.deepPurple};
`;

const Button = styled.button`
  padding: 1rem;
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
