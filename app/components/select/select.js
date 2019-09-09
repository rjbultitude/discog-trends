import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';
import { colours } from '../../utils/theme';

// Styles
const Select = styled.select`
  display: inline-block;
  font-size: 1rem;
  text-align: center;
  color: ${colours.deepPurple};
`;

function createOptions(optionsArr) {
  return optionsArr.map((item, i) => {
    return React.createElement('option', { key: `opt-${i}` }, item);
  });
}

export default props => {
  const { id, changeCB, selectOptions } = props;
  return (
    <Select onChange={e => changeCB(e)} id={id}>
      {createOptions(selectOptions)}
    </Select>
  );
};

Select.propTypes = {
  changeCB: PropTypes.instanceOf(Object),
  selectOptions: PropTypes.instanceOf(Object),
};
