import React, { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from 'common/components/form/Button';
import { Subtitle, Title } from 'common/components/form/Text';
import UsersList from 'common/components/Users/UsersList';
import { UserContext } from 'common/contexts/UserContext';

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 2rem;
`;

const HomePage = styled.div`
  flex: 1 0 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export default function Home() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <HomePage>
      <TextContainer>
        <Title>Home Page</Title>
        <Subtitle>Welcome, {user?.firstname || 'User'}!</Subtitle>
      </TextContainer>

      <ButtonContainer>
        <Button.Primary onClick={() => navigate('/admin')}>
          Admin
        </Button.Primary>
        <Button.Primary onClick={() => navigate('/therapist')}>
          Therapist
        </Button.Primary>
      </ButtonContainer>
      <UsersList />
    </HomePage>
  );
}
