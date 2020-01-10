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
  const {
    toggleScarcityCB,
    scarcityOrder,
    toggleDemandCB,
    demandOrder,
  } = props;
  return (
    <Sort>
      <button onClick={e => toggleScarcityCB(e)} type="button">
        Toggle Scarcity {scarcityOrder}
      </button>
      <button onClick={e => toggleDemandCB(e)} type="button">
        Toggle Demand {demandOrder}
      </button>
    </Sort>
  );
};

Sort.propTypes = {
  changeCB: PropTypes.instanceOf(Object),
};
