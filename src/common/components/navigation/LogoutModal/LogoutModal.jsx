import React from 'react';

import PropTypes from 'prop-types';
import {
  ModalOverlay,
  ModalContent,
  Title,
  Message,
  ButtonContainer,
  CancelButton,
  LogoutButton,
} from './LogoutModalStyles';

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Title>Confirm Logout</Title>
        <Message>Are you sure you want to log out?</Message>
        <ButtonContainer>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <LogoutButton onClick={onLogout}>Logout</LogoutButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

LogoutModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default LogoutModal;
