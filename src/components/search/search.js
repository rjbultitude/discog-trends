import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';
import { colours } from '../../utils/theme';
import { TEXT_FIELD_PATTERN, DATA_INPUT_TIMEOUT } from '../../utils/constants';

// Styles
const TextInput = styled.input`
  border: 1px solid grey;
  box-sizing: border-box;
  color: ${colours.deepPurple};
  font-size: 1rem;
  width: 100%;
`;
let timeoutId = 0;

function keyPress(e, changeCB) {
  const { value } = e.target;
  if (TEXT_FIELD_PATTERN.test(value) !== true) {
    changeCB(null);
    return;
  }
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    changeCB(value);
  }, DATA_INPUT_TIMEOUT);
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
