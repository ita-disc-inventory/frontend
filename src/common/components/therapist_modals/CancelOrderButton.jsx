import React from 'react';
import PropTypes from 'prop-types';
import { StyledCancelButton } from './CancelOrderButtonStyles';

export default function CancelOrderButton({ onClick }) {
  return <StyledCancelButton onClick={onClick}>Cancel</StyledCancelButton>;
}

CancelOrderButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
