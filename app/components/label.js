import React from 'react';

// Styles
import styled from 'styled-components';
import {colours} from '../theme.js';

// Styles
const Label = styled.label`
  display: inline-block;
  width: 70px;
  font-size: 1rem;
  text-align: center;
  color: ${colours.deepPurple};
`;

export default (props) => {
  return (
    <Label>
      {props.text}
    </Label>
  );
}
