import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';
import { colours } from '../../utils/theme';

// Styles
const TextInput = styled.input`
  border: 1px solid grey;
  box-sizing: border-box;
  color: ${colours.deepPurple};
  font-size: 1rem;
  width: 100%;
`;

function keyPress(e, changeCB) {
  const { value } = e.target;
  const pattern = /^[A-Za-z0-9\s]*$/;
  const charCode = e.keyCode;
  const charStr = String.fromCharCode(charCode);
  console.log('value', value);
  console.log('charStr', charStr);
  if (pattern.test(value) !== true) {
    changeCB(null);
    return;
  }
  changeCB(e.target.value);
  return;
}

export default (props) => {
  const { id, changeCB } = props;
  return (
    <TextInput onKeyUp={(e) => keyPress(e, changeCB)} id={id} type="text" />
  );
};

TextInput.propTypes = {
  changeCB: PropTypes.instanceOf(Object),
};
