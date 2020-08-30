import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';
import { colours } from '../../utils/theme';

// Styles
const Label = styled.label.attrs({
  htmlFor: 'test',
})`
  color: ${colours.deepPurple};
  display: inline-block;
  font-size: 1rem;
  margin: 4px auto;
  text-align: left;
  width: 70px;
`;

export default (props) => {
  const { forVal, text } = props;
  return <Label htmlFor={forVal}>{text}</Label>;
};

Label.propTypes = {
  forVal: PropTypes.string,
  text: PropTypes.string,
};
