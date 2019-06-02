import React from 'react';

// Styles
import styled from 'styled-components';
import {colours} from '../../utils/theme.js';

// Styles
const Select = styled.select`
  display: inline-block;
  font-size: 1rem;
  text-align: center;
  color: ${colours.deepPurple};
`;

function createOptions(optionsArr) {
  return optionsArr.map((item, i) => {
    return React.createElement('option', {key: `opt-${i}`}, item);
  });
}

export default (props) => {
  return (
    <Select onChange={(e) => props.changeCB(e)} id={props.id}>
      {createOptions(props.selectOptions)}
    </Select>
  );
}
