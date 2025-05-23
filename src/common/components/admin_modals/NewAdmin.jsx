import FormPopup from 'common/components/templates/FormPopup/FormPopup';
import PropTypes from 'prop-types';
import { Dialog } from 'radix-ui';
import React, { useState } from 'react';
import {
  ButtonContainer,
  CancelButton,
  InputField,
  Label,
  StyledButton,
} from './NewAdminStyles';

export default function NewAdmin({ open, onCancel, onConfirm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const specialization = 'standard_admin';
    const position = 'admin';
    onConfirm({
      email,
      password,
      username,
      firstname,
      lastname,
      specialization,
      position,
    });
  };

  return (
    <FormPopup
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onCancel();
      }}
      title='Add New Admin'
      description='Please choose a role and provide your credentials'
      customForm={true}
    >
      <Label>
        First Name:
        <span style={{ color: 'red' }}>*</span>
      </Label>
      <InputField
        type='text'
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        placeholder='Enter first name'
        required
      />

      <Label>
        Last Name:
        <span style={{ color: 'red' }}>*</span>
      </Label>
      <InputField
        type='text'
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        placeholder='Enter last name'
        required
      />

      <Label>
        Email:
        <span style={{ color: 'red' }}>*</span>
      </Label>
      <InputField
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='admin@example.com'
        required
      />

      <Label>
        Password:
        <span style={{ color: 'red' }}>*</span>
      </Label>
      <InputField
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Enter secure password'
        required
      />

      <ButtonContainer>
        <CancelButton type='button' onClick={onCancel}>
          Cancel
        </CancelButton>

        <Dialog.Close asChild>
          <StyledButton type='submit' onClick={handleSubmit}>
            Create Admin
          </StyledButton>
        </Dialog.Close>
      </ButtonContainer>
    </FormPopup>
  );
}

NewAdmin.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
