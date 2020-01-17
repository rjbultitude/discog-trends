import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';
import { colours } from '../../utils/theme';

// Styles
const TextInput = styled.input`
  border: 1px solid grey;
  font-size: 1rem;
  color: ${colours.deepPurple};
`;

let numStrokes = 0;

function keyDown(e, changeCB) {
  if (numStrokes > 3) {
    changeCB(e.target.value);
    console.log('searching');
  }
  numStrokes += 1;
}

export default props => {
  const { id, changeCB } = props;
  return (
    <TextInput
      onKeyDown={e => keyDown(e, changeCB)}
      id={id}
      type="text"
      pattern="[A-Za-z0-9]"
    />
  );
};

TextInput.propTypes = {
  changeCB: PropTypes.instanceOf(Object),
};
