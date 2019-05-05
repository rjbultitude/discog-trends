import React from 'react';

// Styles
import styled from 'styled-components';
import {colours} from '../theme.js';

// Styles
const Label = styled.label`
  font-size: 1.5rem;
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
