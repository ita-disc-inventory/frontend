import React from 'react';

import styled from 'styled-components';

import ResetPassword from 'pages/account/ResetPassword';

import FormPopup from './FormPopup';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const TriggerButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: var(--violet-4);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: var(--violet-6);
  }
`;

export default function PasswordChangeForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log('Password reset');
  };

  return (
    <div>
      <ButtonContainer>
        <FormPopup
          title='Reset Password'
          description='Enter your current and new password'
          onSubmit={handleSubmit}
          maxWidth='50%'
        >
          <ResetPassword />
        </FormPopup>
      </ButtonContainer>
    </div>
  );
}
