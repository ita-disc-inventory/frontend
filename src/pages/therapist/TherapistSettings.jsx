import React, { useState } from 'react';

import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

import PasswordChangeForm from 'common/components/PasswordChangeForm';
import { Subtitle, Title } from 'common/components/Text';
import { Form, FormTitle } from 'common/components/form/Form';
import { Input } from 'common/components/form/Input';
import { useUser } from 'common/contexts/UserContext';

const SettingsPage = styled.div`
  flex: 1 0 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FieldLabel = styled.h1`
  font-size: 14px;
  color: #555;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const FieldValue = styled.div`
  font-size: 16px;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  margin-bottom: 0.5rem;
  text-align: center;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
`;
const FieldInput = styled.input`
  font-size: 16px;
  padding: 0.5rem;
  border: 1px solid #000000;
  margin-bottom: 0.5rem;
  text-align: center;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
`;

const ChangePasswordButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  transition: background-color 0.2s;
  align-self: center;

  &:hover {
    background-color: #3a80d2;
  }
`;

const LogoutButton = styled.button`
  background-color: #f66e6f;
  color: white;
  border-radius: 25px;
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1.25rem;
  margin-top: 1rem;
  align-self: center;
`;
const Updatebutton = styled.button`
  background-color: blue;
  color: white;
  border-radius: 25px;
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1.25rem;
  margin-top: 1rem;
  align-self: center;
`;

export default function TherapistSettings() {
  const { user, logout, buildUrl } = useUser();

  const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [role, setRole] = useState('');
  const [specialization, setSpecialization] = useState(user.specialization);

  

  return (
    <SettingsPage>
      <TextContainer>
        <Title>Therapist Account Settings</Title>
        <FieldLabel>Full Name</FieldLabel>
        <FieldValue>
          {user.firstname} {user.lastname}{' '}
        </FieldValue>
        <FieldLabel>Email</FieldLabel>
        <FieldValue>{user.email} </FieldValue>
        <FieldLabel>Role</FieldLabel>
        <FieldValue>{user.position_title}</FieldValue>
        <FieldLabel>Specialization</FieldLabel>
        <FieldInput
          title='Specialization'
          name='specialization'
          placeholder='Add therapy specialization here'
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          required
        />
      </TextContainer>
      <PasswordChangeForm />
      <Updatebutton>Update Settings</Updatebutton>
      {'      '}
      <LogoutButton onClick={logout}>Logout</LogoutButton>
    </SettingsPage>
  );
}
