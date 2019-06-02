import React from 'react';

// Styles
import styled from 'styled-components';
import {colours} from '../../utils/theme.js';

// Styles
const Label = styled.label.attrs({
  htmlFor: 'test'
})`
  display: inline-block;
  width: 70px;
  font-size: 1rem;
  text-align: center;
  color: ${colours.deepPurple};
`;

export default (props) => {
  return (
    <Label htmlFor={props.forVal}>
      {props.text}
    </Label>
  );
}
