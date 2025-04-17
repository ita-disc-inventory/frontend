import FormPopup from 'common/components/templates/FormPopup';
import PropTypes from 'prop-types';
import { Dialog } from 'radix-ui';
import React, { useState } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  height: 35px;
  user-select: none;
  background-color: var(--green-4);
  color: var(--green-11);
  outline-color: var(--green-7);
  &:hover {
    background-color: var(--green-5);
  }
`;

const InputField = styled.input`
  width: 100%;
  border-radius: 4px;
  padding: 10px;
  font-size: 15px;
  line-height: 1.5;
  color: black;
  border: solid 2px var(--text);
  height: 40px;
  margin-bottom: 20px;
`;

const SelectField = styled.select`
  width: 100%;
  border-radius: 4px;
  padding: 10px;
  font-size: 15px;
  line-height: 1.5;
  color: black;
  border: solid 2px var(--text);
  height: 40px;
  margin-bottom: 20px;
  background-color: white;
`;

const Label = styled.label`
  display: block;
  font-size: 15px;
  color: black;
  margin-bottom: 10px;
`;

export default function NewAdmin({ open, onCancel, onConfirm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let specialization = 'standard_admin';
    let position = 'admin';
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

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <StyledButton
          type='button'
          onClick={onCancel}
          style={{
            backgroundColor: 'var(--red-4)',
            color: 'var(--red-11)',
          }}
        >
          Cancel
        </StyledButton>

        <Dialog.Close asChild>
          <StyledButton type='submit' onClick={handleSubmit}>
            Create Admin
          </StyledButton>
        </Dialog.Close>
      </div>
    </FormPopup>
  );
}

NewAdmin.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
