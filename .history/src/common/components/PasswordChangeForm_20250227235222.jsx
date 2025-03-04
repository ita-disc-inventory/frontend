import React, { useState } from 'react';

import FormPopup from './FormPopup';
import { Input } from './form/Input';

export default function PasswordChangeForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password change logic here
    console.log('Password changed:', { currentPassword, newPassword });
  };

  return (
    <FormPopup
      title='Change Password'
      description='Enter your current and new password'
      onSubmit={handleSubmit}
    >
      <Input.Password
        title='Current Password'
        value={currentPassword}
        onChange={handleCurrentPasswordChange}
        placeholder='Enter current password'
        required
      />
      <Input.Password
        title='New Password'
        value={newPassword}
        onChange={handleNewPasswordChange}
        placeholder='Enter new password'
        required
      />
    </FormPopup>
  );
}
