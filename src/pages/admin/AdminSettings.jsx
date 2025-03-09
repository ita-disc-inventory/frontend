import React from 'react';
import styled from 'styled-components';

import { Title, Subtitle } from 'common/components/Text';
import { useUser } from 'common/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import PasswordChangeForm from 'common/components/PasswordChangeForm';

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
  width: 40%;
  margin-left: auto;
  margin-right: auto;
`;

const ChangePasswordButton = styled.button`
  color: #0069ff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  align-self: center;
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

export default function AdminSettings() {
  const { user, logout } = useUser();

  return (
    <SettingsPage>
      <TextContainer>
        <Title>Admin Account Settings</Title>
        <FieldLabel>Full Name</FieldLabel>
        <FieldValue>
          {user.firstname} {user.lastname}
        </FieldValue>
        <FieldLabel>Email</FieldLabel>
        <FieldValue>{user.email}</FieldValue>
        <FieldLabel>Role</FieldLabel>
        <FieldValue>{user.position_title}</FieldValue>
        <FieldLabel>Specialization</FieldLabel>
        <FieldValue>{user.specialization}</FieldValue>
        <PasswordChangeForm />
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </TextContainer>
    </SettingsPage>
  );
}
