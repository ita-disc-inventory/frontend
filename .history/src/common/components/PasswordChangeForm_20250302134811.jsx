import React from 'react';

import styled from 'styled-components';

import ResetPassword from 'pages/account/ResetPassword';

import FormPopup from './FormPopup';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export default function PasswordChangeForm() {
  return (
    <div>
      <ButtonContainer>
        <FormPopup
          title='Reset Password'
          description='Enter your current and new password'
          maxWidth='40%'
          defaultSubmit={false}
        >
          {/* ResetPassword component (from template) handles Logic for resetting password */}
          <ResetPassword />
        </FormPopup>
      </ButtonContainer>
    </div>
  );
}
