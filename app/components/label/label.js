import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';
import { colours } from '../../utils/theme';

// Styles
const Label = styled.label.attrs({
  htmlFor: 'test',
})`
  display: inline-block;
  width: 70px;
  font-size: 1rem;
  text-align: center;
  color: ${colours.deepPurple};
`;

export default props => {
  const { forVal, text } = props;
  return <Label htmlFor={forVal}>{text}</Label>;
};

Label.propTypes = {
  forVal: PropTypes.string,
  text: PropTypes.string,
};
