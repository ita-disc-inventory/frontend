import React from 'react';

import styled from 'styled-components';

import ResetPassword from 'pages/account/ResetPassword';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
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
        <ResetPassword />
      </ButtonContainer>
    </div>
  );
}
