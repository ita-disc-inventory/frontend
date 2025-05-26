import React from 'react';

import FormPopup from 'common/components/templates/FormPopup/FormPopup';
import ResetPassword from 'pages/account/ResetPassword';
import { ButtonContainer } from './PasswordChangeFormStyles';

export default function PasswordChangeForm() {
  return (
    <div>
      <ButtonContainer>
        <FormPopup
          title='Reset Password'
          description='Enter your current and new password'
          maxWidth='40%'
          defaultSubmit={false}
          customForm={true}
          buttonText='Change password?'
        >
          {/* ResetPassword component (from template) handles Logic for resetting password */}
          <ResetPassword />
        </FormPopup>
      </ButtonContainer>
    </div>
  );
}
