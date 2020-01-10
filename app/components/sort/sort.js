import React from 'react';
import PropTypes, { string } from 'prop-types';

// Styles
import styled from 'styled-components';

// Styles
const Sort = styled.div`
  border: 1px solid black;
  display: inline-block;
`;

export default props => {
  const { name, toggleCB, currentOrder } = props;
  return (
    <Sort>
      <button onClick={e => toggleCB(e)} type="button">
        Toggle {name} {currentOrder}
      </button>
    </Sort>
  );
};

Sort.propTypes = {
  name: PropTypes.string,
  changeCB: PropTypes.instanceOf(Object),
};
