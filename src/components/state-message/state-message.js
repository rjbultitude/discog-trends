import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';
import { padding } from '../../utils/theme';

// Styles
const Message = styled.div`
  background-color: white;
  padding: ${padding};

  .heading {
    text-align: center;
    width: 100%;
  }
`;

export default ({ title }) => {
  return (
    <Message>
      <h2 className="heading">{title}</h2>
    </Message>
  );
};

Message.propTypes = {
  title: PropTypes.string,
};
