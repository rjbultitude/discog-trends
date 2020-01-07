import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';

// Styles
const Sort = styled.div`
  border: 1px solid black;
  display: inline-block;
`;

export default props => {
  const { id, toggleScarcityCB, toggleDemandCB } = props;
  return (
    <Sort>
      <button onClick={e => toggleScarcityCB(e)}>Toggle Scarcity</button>
      <button onClick={e => toggleDemandCB(e)}>Toggle Demand</button>
    </Sort>
  );
};

Sort.propTypes = {
  changeCB: PropTypes.instanceOf(Object),
};
