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

function keyPress(e, changeCB) {
  const { value } = e.target;
  const pattern = /^[A-Za-z0-9 ]*$/;
  const charCode = e.keyCode;
  const charStr = String.fromCharCode(charCode);
  if (value === '') {
    numStrokes = 0;
    return;
  }
  if (pattern.test(value) !== true) {
    changeCB(null);
    return;
  }
  if (pattern.test(charStr)) {
    if (numStrokes > 3) {
      changeCB(e.target.value);
      console.log('searching');
    }
    numStrokes += 1;
    console.log('numStrokes', numStrokes);
  }
}

export default props => {
  const { id, changeCB } = props;
  return <TextInput onKeyUp={e => keyPress(e, changeCB)} id={id} type="text" />;
};

TextInput.propTypes = {
  changeCB: PropTypes.instanceOf(Object),
};
